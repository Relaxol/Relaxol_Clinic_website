import { supabase } from '@/integrations/supabase/client';

interface LogActivityParams {
  tenantId: string;
  userId?: string;
  userEmail?: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'unpublish' | 'upload' | 'restore';
  entityType: 'page' | 'post' | 'media' | 'category' | 'tag' | 'author';
  entityId?: string;
  entityTitle?: string;
  details?: Record<string, unknown>;
}

export async function logActivity(params: LogActivityParams) {
  try {
    await supabase.from('activity_log').insert({
      tenant_id: params.tenantId,
      user_id: params.userId || null,
      user_email: params.userEmail || null,
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId || null,
      entity_title: params.entityTitle || null,
      details: params.details || {},
    } as any);
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
