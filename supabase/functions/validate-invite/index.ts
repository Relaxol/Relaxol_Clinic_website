import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Missing token parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role to fetch invite
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const serviceSupabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch invite by token with tenant info
    const { data: invite, error: inviteError } = await serviceSupabase
      .from('invites')
      .select(`
        id,
        email,
        role,
        expires_at,
        accepted_at,
        tenants!inner (
          id,
          name
        )
      `)
      .eq('token', token)
      .maybeSingle();

    if (inviteError || !invite) {
      console.error('Invite not found:', inviteError?.message);
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid invite link' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if invite is already accepted
    if (invite.accepted_at) {
      return new Response(
        JSON.stringify({ valid: false, error: 'This invite has already been used' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if invite has expired
    if (new Date(invite.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ valid: false, error: 'This invite has expired' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tenant = invite.tenants as unknown as { id: string; name: string };

    return new Response(
      JSON.stringify({ 
        valid: true,
        invite: {
          email: invite.email,
          role: invite.role,
          tenant_name: tenant.name,
          expires_at: invite.expires_at
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ valid: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});