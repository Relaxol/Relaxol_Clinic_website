import React, { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, ImageIcon, X, Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  mime_type: string | null;
}

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  altText?: string;
  onAltChange?: (alt: string) => void;
  disabled?: boolean;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  altText,
  onAltChange,
  disabled,
}: ImageUploadFieldProps) {
  const { membership, user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [libraryItems, setLibraryItems] = useState<MediaItem[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !membership?.tenantId) return;

    setUploading(true);
    try {
      const filePath = `${membership.tenantId}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Save to media table
      await supabase.from('media').insert({
        tenant_id: membership.tenantId,
        filename: file.name,
        url: urlData.publicUrl,
        size: file.size,
        mime_type: file.type,
        uploaded_by: user?.id,
        alt_text: null,
      });

      onChange(urlData.publicUrl);
      toast({ title: 'Image uploaded successfully' });
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const openLibrary = async () => {
    if (!membership?.tenantId) return;
    setShowLibrary(true);
    setLibraryLoading(true);
    try {
      const { data, error } = await supabase
        .from('media')
        .select('id, filename, url, alt_text, mime_type')
        .eq('tenant_id', membership.tenantId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setLibraryItems((data || []).filter(m => m.mime_type?.startsWith('image/')));
    } catch {
      setLibraryItems([]);
    } finally {
      setLibraryLoading(false);
    }
  };

  const filteredItems = libraryItems.filter(
    (m) =>
      !librarySearch ||
      m.filename.toLowerCase().includes(librarySearch.toLowerCase()) ||
      m.alt_text?.toLowerCase().includes(librarySearch.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* Preview */}
      {value && (
        <div className="relative w-full max-w-xs rounded-lg overflow-hidden border border-border bg-muted">
          <img
            src={value}
            alt={altText || 'Preview'}
            className="w-full h-32 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {!disabled && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-1 right-1 bg-background/80 rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}

      {/* URL input + actions */}
      <div className="flex gap-2">
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload below"
          disabled={disabled}
          className="flex-1"
        />
      </div>

      {!disabled && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-1" />
            )}
            Upload
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openLibrary}
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            Browse Library
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      )}

      {/* Alt text field if provided */}
      {onAltChange !== undefined && (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Alt Text</Label>
          <Input
            value={altText || ''}
            onChange={(e) => onAltChange?.(e.target.value)}
            placeholder="Describe the image for accessibility"
            disabled={disabled}
            className="text-sm"
          />
        </div>
      )}

      {/* Media Library Dialog */}
      <Dialog open={showLibrary} onOpenChange={setShowLibrary}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={librarySearch}
              onChange={(e) => setLibrarySearch(e.target.value)}
              placeholder="Search images..."
              className="pl-9"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {libraryLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredItems.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">No images found</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChange(item.url);
                      if (onAltChange && item.alt_text) {
                        onAltChange(item.alt_text);
                      }
                      setShowLibrary(false);
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary ${
                      value === item.url ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.alt_text || item.filename}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-background/80 px-1 py-0.5">
                      <p className="text-[10px] truncate">{item.filename}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
