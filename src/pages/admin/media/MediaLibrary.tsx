import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Upload, Trash2, Loader2, Image as ImageIcon, Copy, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  size: number | null;
  mime_type: string | null;
  created_at: string;
}

const MediaLibrary = () => {
  const { membership, user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [editingAlt, setEditingAlt] = useState('');

  const licenseActive = membership?.licenseActive !== false;
  const canEdit = membership?.role !== 'viewer' && licenseActive;
  const isAdmin = membership?.role === 'admin';

  useEffect(() => {
    fetchMedia();
  }, [membership?.tenantId]);

  const fetchMedia = async () => {
    if (!membership?.tenantId) return;

    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('tenant_id', membership.tenantId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !canEdit) return;

    setUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        // Generate a unique path: tenantId/timestamp-filename
        const filePath = `${membership!.tenantId}/${Date.now()}-${file.name}`;
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // Save metadata to the media table
        const { error: dbError } = await supabase.from('media').insert({
          tenant_id: membership!.tenantId,
          filename: file.name,
          url: urlData.publicUrl,
          size: file.size,
          mime_type: file.type,
          uploaded_by: user?.id,
          alt_text: null,
        });

        if (dbError) throw dbError;
      }
      
      toast({ title: 'Files uploaded successfully' });
      fetchMedia();
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUpdateAlt = async () => {
    if (!selectedMedia) return;

    try {
      const { error } = await supabase
        .from('media')
        .update({ alt_text: editingAlt || null })
        .eq('id', selectedMedia.id);

      if (error) throw error;
      
      toast({ title: 'Alt text updated' });
      setSelectedMedia(null);
      fetchMedia();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      // Find the media item to get its storage path
      const item = media.find(m => m.id === id);
      if (item?.url) {
        // Extract the storage path from the public URL
        const urlParts = item.url.split('/media/');
        if (urlParts.length > 1) {
          const storagePath = decodeURIComponent(urlParts[urlParts.length - 1]);
          await supabase.storage.from('media').remove([storagePath]);
        }
      }

      const { error } = await supabase.from('media').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'File deleted' });
      setSelectedMedia(null);
      fetchMedia();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: 'URL copied to clipboard' });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredMedia = media.filter(item => 
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your images and files</p>
        </div>
        {canEdit && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Upload
            </Button>
          </div>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredMedia.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
          {searchQuery ? 'No files found' : 'No files uploaded yet'}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <Card 
              key={item.id} 
              className="cursor-pointer hover:ring-2 hover:ring-primary transition-all overflow-hidden"
              onClick={() => {
                setSelectedMedia(item);
                setEditingAlt(item.alt_text || '');
              }}
            >
              <CardContent className="p-0">
                {item.mime_type?.startsWith('image/') ? (
                  <img 
                    src={item.url} 
                    alt={item.alt_text || item.filename}
                    className="w-full aspect-square object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-muted flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="p-2">
                  <p className="text-xs truncate">{item.filename}</p>
                  {!item.alt_text && (
                    <p className="text-xs text-destructive">Missing alt text</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Media Detail Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
          </DialogHeader>
          {selectedMedia && (
            <div className="space-y-4">
              {selectedMedia.mime_type?.startsWith('image/') && (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.alt_text || selectedMedia.filename}
                  className="w-full max-h-64 object-contain bg-muted rounded"
                />
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Filename</p>
                  <p className="font-medium">{selectedMedia.filename}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-medium">{selectedMedia.size ? formatBytes(selectedMedia.size) : '-'}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL</Label>
                <div className="flex gap-2">
                  <Input value={selectedMedia.url} readOnly />
                  <Button variant="outline" size="icon" onClick={() => copyUrl(selectedMedia.url)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alt Text *</Label>
                <Input
                  value={editingAlt}
                  onChange={(e) => setEditingAlt(e.target.value)}
                  placeholder="Describe the image for accessibility"
                  disabled={!canEdit}
                />
                <p className="text-xs text-muted-foreground">Alt text is required for accessibility</p>
              </div>

              <div className="flex justify-between">
                {isAdmin && (
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(selectedMedia.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
                {canEdit && (
                  <Button onClick={handleUpdateAlt} className="ml-auto">
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaLibrary;
