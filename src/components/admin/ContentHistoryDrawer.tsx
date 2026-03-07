import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Clock, RotateCcw, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TemplateType, TemplateContent } from '@/lib/templates/schemas';
import TemplatePreviewRenderer from './TemplatePreviewRenderer';

interface HistoryEntry {
  id: string;
  content_json: unknown;
  saved_at: string;
  saved_by: string | null;
  version_note: string | null;
}

interface ContentHistoryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageId: string;
  template: TemplateType | null;
  onRevert: (content: TemplateContent) => void;
}

const ContentHistoryDrawer: React.FC<ContentHistoryDrawerProps> = ({
  open,
  onOpenChange,
  pageId,
  template,
  onRevert,
}) => {
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [revertingEntry, setRevertingEntry] = useState<HistoryEntry | null>(null);

  useEffect(() => {
    if (open && pageId) {
      fetchHistory();
    }
  }, [open, pageId]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_content_history')
        .select('*')
        .eq('page_id', pageId)
        .order('saved_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevert = (entry: HistoryEntry) => {
    setRevertingEntry(entry);
  };

  const confirmRevert = () => {
    if (revertingEntry) {
      onRevert(revertingEntry.content_json as TemplateContent);
      toast({
        title: 'Content restored',
        description: `Reverted to version from ${formatDate(revertingEntry.saved_at)}. Click Save to persist.`,
      });
      setRevertingEntry(null);
      onOpenChange(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getChangesSummary = (entry: HistoryEntry, prevEntry?: HistoryEntry): string => {
    if (!prevEntry) return 'Initial version';
    
    const current = entry.content_json as Record<string, unknown>;
    const previous = prevEntry.content_json as Record<string, unknown>;
    
    const changedSections: string[] = [];
    const allKeys = new Set([...Object.keys(current || {}), ...Object.keys(previous || {})]);
    
    allKeys.forEach(key => {
      if (JSON.stringify(current?.[key]) !== JSON.stringify(previous?.[key])) {
        changedSections.push(key);
      }
    });
    
    if (changedSections.length === 0) return 'No changes detected';
    if (changedSections.length <= 3) return `Changed: ${changedSections.join(', ')}`;
    return `Changed: ${changedSections.slice(0, 3).join(', ')} +${changedSections.length - 3} more`;
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Content History
            </SheetTitle>
            <SheetDescription>
              View and restore previous versions of this page's content.
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-140px)] mt-4 pr-2">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No history yet</p>
                <p className="text-sm mt-1">Version history will appear here after your first save.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-6 bottom-6 w-px bg-border" />

                <div className="space-y-1">
                  {history.map((entry, index) => {
                    const isPreviewOpen = previewingId === entry.id;
                    const prevEntry = index < history.length - 1 ? history[index + 1] : undefined;

                    return (
                      <div key={entry.id} className="relative pl-10">
                        {/* Timeline dot */}
                        <div className={`absolute left-[11px] top-4 w-[10px] h-[10px] rounded-full border-2 ${
                          index === 0 
                            ? 'bg-primary border-primary' 
                            : 'bg-background border-muted-foreground/40'
                        }`} />

                        <div className={`rounded-lg border p-3 transition-colors ${
                          index === 0 ? 'border-primary/30 bg-primary/5' : 'hover:bg-muted/50'
                        }`}>
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {formatDate(entry.saved_at)}
                                </span>
                                {index === 0 && (
                                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                                    Latest
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {entry.version_note || getChangesSummary(entry, prevEntry)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              {template && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => setPreviewingId(isPreviewOpen ? null : entry.id)}
                                  title="Preview this version"
                                >
                                  {isPreviewOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-primary hover:text-primary"
                                onClick={() => handleRevert(entry)}
                                title="Restore this version"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>

                          {/* Inline preview */}
                          {isPreviewOpen && template && (
                            <div className="mt-3 border rounded-md overflow-hidden max-h-[400px] overflow-y-auto bg-background">
                              <TemplatePreviewRenderer
                                template={template}
                                content={entry.content_json as TemplateContent}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Revert confirmation dialog */}
      <AlertDialog open={!!revertingEntry} onOpenChange={(open) => !open && setRevertingEntry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore this version?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace your current draft with the content from{' '}
              <strong>{revertingEntry ? formatDate(revertingEntry.saved_at) : ''}</strong>.
              Your current content will be backed up automatically when you save.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRevert}>
              Restore Version
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContentHistoryDrawer;
