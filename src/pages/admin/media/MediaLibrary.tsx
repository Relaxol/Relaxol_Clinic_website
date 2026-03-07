import React, { useEffect, useState, useRef, useMemo } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, Trash2, Loader2, Image as ImageIcon, Copy, Search, DatabaseBackup, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt_text: string | null;
  size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

// All existing site images to seed
const SITE_IMAGES = [
  'about-clinic.jpg',
  'condition-anxiety-new.jpg',
  'condition-depression-new.jpg',
  'condition-ocd-new.jpg',
  'condition-pain-v4.jpg',
  'condition-ptsd-new.jpg',
  'doctor-portrait.jpg',
  'dr-sangeet-khanna.jpg',
  'hero-background.jpg',
  'infusion-alleviate-v3.jpg',
  'infusion-beauty-new.jpg',
  'infusion-energy.jpg',
  'infusion-immunity-new.jpg',
  'infusion-quench-new.jpg',
  'infusion-recovery-new.jpg',
  'ketamine-directory-badge.png',
  'ketamine-mechanism.jpg',
  'ketamine-personalized.jpg',
  'ketamine-rapid-relief.jpg',
  'ketamine-supervised.jpg',
  'nad-infusion.jpg',
  'relaxol-logo-2025.png',
  'relaxol-logo-footer.png',
  'relaxol-logo-header.png',
  'relaxol-logo-transparent.png',
  'service-anxiety.jpg',
  'service-depression.jpg',
  'service-ketamine-infusion.jpg',
  'service-maintenance.jpg',
  'service-pain.jpg',
  'service-ptsd.jpg',
  'spravato-abstract-medical.jpg',
  'spravato-brain-mechanism-new.png',
  'spravato-clinic-interior.jpg',
  'spravato-device-official.png',
  'spravato-mechanism.png',
  'spravato-nasal-spray.png',
  'treatment-ketamine-new.jpg',
  'treatment-pain-management-v2.png',
  'treatment-pain-management.jpg',
  'treatment-room.jpg',
  'treatment-spravato.jpg',
  'treatment-telehealth.jpg',
  'vitamin-b12-injection.jpg',
];

const PUBLIC_IMAGES = [
  'condition-anxiety-v2.jpg',
  'condition-depression-v2.jpg',
  'condition-ocd-v2.jpg',
  'condition-pain-v4.jpg',
  'condition-ptsd-v2.jpg',
];

type SortOption = 'newest' | 'oldest' | 'name_asc' | 'name_desc' | 'size_asc' | 'size_desc' | 'dim_asc' | 'dim_desc';
type TypeFilter = 'all' | 'jpg' | 'png' | 'svg' | 'other';

function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error(`Failed to load ${url}`));
    img.src = url;
  });
}

async function fetchImageAsBlob(url: string): Promise<{ blob: Blob; size: number; type: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const blob = await res.blob();
  return { blob, size: blob.size, type: blob.type };
}

const MediaLibrary = () => {
  const { membership, user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedProgress, setSeedProgress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
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
      setMedia((data as any[]) || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedMedia = useMemo(() => {
    let items = media.filter(item =>
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Type filter
    if (typeFilter !== 'all') {
      items = items.filter(item => {
        const mime = item.mime_type?.toLowerCase() || '';
        const ext = item.filename.split('.').pop()?.toLowerCase() || '';
        switch (typeFilter) {
          case 'jpg': return mime.includes('jpeg') || mime.includes('jpg') || ext === 'jpg' || ext === 'jpeg';
          case 'png': return mime.includes('png') || ext === 'png';
          case 'svg': return mime.includes('svg') || ext === 'svg';
          case 'other': return !['jpg', 'jpeg', 'png', 'svg'].includes(ext);
        }
      });
    }

    // Sort
    const sorted = [...items];
    switch (sortBy) {
      case 'newest': sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      case 'oldest': sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()); break;
      case 'name_asc': sorted.sort((a, b) => a.filename.localeCompare(b.filename)); break;
      case 'name_desc': sorted.sort((a, b) => b.filename.localeCompare(a.filename)); break;
      case 'size_asc': sorted.sort((a, b) => (a.size ?? 0) - (b.size ?? 0)); break;
      case 'size_desc': sorted.sort((a, b) => (b.size ?? 0) - (a.size ?? 0)); break;
      case 'dim_asc': sorted.sort((a, b) => ((a.width ?? 0) * (a.height ?? 0)) - ((b.width ?? 0) * (b.height ?? 0))); break;
      case 'dim_desc': sorted.sort((a, b) => ((b.width ?? 0) * (b.height ?? 0)) - ((a.width ?? 0) * (a.height ?? 0))); break;
    }

    return sorted;
  }, [media, searchQuery, sortBy, typeFilter]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !canEdit) return;

    setUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        const filePath = `${membership!.tenantId}/${Date.now()}-${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);

        let width: number | null = null;
        let height: number | null = null;
        if (file.type.startsWith('image/')) {
          try {
            const dims = await getImageDimensions(urlData.publicUrl);
            width = dims.width;
            height = dims.height;
          } catch {}
        }

        const { error: dbError } = await supabase.from('media').insert({
          tenant_id: membership!.tenantId,
          filename: file.name,
          url: urlData.publicUrl,
          size: file.size,
          mime_type: file.type,
          uploaded_by: user?.id,
          alt_text: null,
          width,
          height,
        } as any);

        if (dbError) throw dbError;
      }
      
      toast({ title: 'Files uploaded successfully' });
      fetchMedia();
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSeedImages = async () => {
    if (!isAdmin || !membership?.tenantId) return;
    
    const confirmed = confirm(
      `This will upload ${SITE_IMAGES.length + PUBLIC_IMAGES.length} existing site images to the media library. Continue?`
    );
    if (!confirmed) return;

    setSeeding(true);
    let uploaded = 0;
    let skipped = 0;
    let failed = 0;
    const total = SITE_IMAGES.length + PUBLIC_IMAGES.length;

    const existingFilenames = new Set(media.map(m => m.filename));

    const uploadImage = async (filename: string, sourceUrl: string) => {
      if (existingFilenames.has(filename)) {
        skipped++;
        setSeedProgress(`${uploaded + skipped + failed}/${total} — Skipped ${filename} (exists)`);
        return;
      }

      try {
        setSeedProgress(`${uploaded + skipped + failed}/${total} — Uploading ${filename}...`);

        const { blob, size, type } = await fetchImageAsBlob(sourceUrl);

        let width: number | null = null;
        let height: number | null = null;
        try {
          const dims = await getImageDimensions(sourceUrl);
          width = dims.width;
          height = dims.height;
        } catch {}

        const storagePath = `${membership!.tenantId}/${filename}`;
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(storagePath, blob, { cacheControl: '31536000', upsert: true, contentType: type });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('media').getPublicUrl(storagePath);

        const altText = filename
          .replace(/\.[^.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b(v\d+|new|\d{8}b?)\b/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        const { error: dbError } = await supabase.from('media').insert({
          tenant_id: membership!.tenantId,
          filename,
          url: urlData.publicUrl,
          size,
          mime_type: type,
          uploaded_by: user?.id,
          alt_text: altText || null,
          width,
          height,
        } as any);

        if (dbError) throw dbError;
        uploaded++;
      } catch (err) {
        console.error(`Failed to seed ${filename}:`, err);
        failed++;
      }
    };

    for (const filename of SITE_IMAGES) {
      const sourceUrl = new URL(`/src/assets/${filename}`, window.location.origin).href;
      await uploadImage(filename, sourceUrl);
    }

    for (const filename of PUBLIC_IMAGES) {
      if (existingFilenames.has(filename)) { skipped++; continue; }
      const sourceUrl = new URL(`/images/${filename}`, window.location.origin).href;
      await uploadImage(filename, sourceUrl);
    }

    setSeeding(false);
    setSeedProgress('');
    toast({
      title: 'Seed complete',
      description: `Uploaded: ${uploaded} | Skipped: ${skipped} | Failed: ${failed}`,
    });
    fetchMedia();
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
      const item = media.find(m => m.id === id);
      if (item?.url) {
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
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

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
          <p className="text-muted-foreground">
            {media.length} file{media.length !== 1 ? 's' : ''} 
            {filteredAndSortedMedia.length !== media.length && ` · ${filteredAndSortedMedia.length} shown`}
          </p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button variant="outline" onClick={handleSeedImages} disabled={seeding || uploading}>
              {seeding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <DatabaseBackup className="h-4 w-4 mr-2" />}
              {seeding ? 'Seeding...' : 'Import Site Images'}
            </Button>
          )}
          {canEdit && (
            <>
              <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
              <Button onClick={() => fileInputRef.current?.click()} disabled={uploading || seeding}>
                {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                Upload
              </Button>
            </>
          )}
        </div>
      </div>

      {seeding && seedProgress && (
        <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground animate-pulse">
          {seedProgress}
        </div>
      )}

      {/* Search + Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="jpg">JPEG</SelectItem>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="svg">SVG</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <ArrowUpDown className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="name_asc">Name A → Z</SelectItem>
            <SelectItem value="name_desc">Name Z → A</SelectItem>
            <SelectItem value="size_desc">Largest first</SelectItem>
            <SelectItem value="size_asc">Smallest first</SelectItem>
            <SelectItem value="dim_desc">Highest res first</SelectItem>
            <SelectItem value="dim_asc">Lowest res first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAndSortedMedia.length === 0 ? (
        <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
          {searchQuery || typeFilter !== 'all' ? 'No files match your filters' : 'No files uploaded yet'}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAndSortedMedia.map((item) => (
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
                <div className="p-2 space-y-0.5">
                  <p className="text-xs truncate font-medium">{item.filename}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    {item.width && item.height && (
                      <span>{item.width}×{item.height}</span>
                    )}
                    {item.size && (
                      <span>{formatBytes(item.size)}</span>
                    )}
                  </div>
                  {!item.alt_text && (
                    <p className="text-[11px] text-destructive">Missing alt text</p>
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

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Filename</p>
                  <p className="font-medium break-all">{selectedMedia.filename}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-medium">{selectedMedia.size ? formatBytes(selectedMedia.size) : '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Dimensions</p>
                  <p className="font-medium">
                    {selectedMedia.width && selectedMedia.height
                      ? `${selectedMedia.width} × ${selectedMedia.height}px`
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedMedia.mime_type || '-'}</p>
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
                  <Button variant="destructive" onClick={() => handleDelete(selectedMedia.id)}>
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
