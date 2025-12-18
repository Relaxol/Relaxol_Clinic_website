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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'You must be logged in to accept an invite' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's auth
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'You must be logged in to accept an invite' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { token } = await req.json();
    console.log('Accepting invite with token for user:', user.email);

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Missing invite token' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use service role to fetch and validate invite
    const serviceSupabase = createClient(supabaseUrl, serviceRoleKey);

    // Fetch invite by token
    const { data: invite, error: inviteError } = await serviceSupabase
      .from('invites')
      .select('*')
      .eq('token', token)
      .maybeSingle();

    if (inviteError || !invite) {
      console.error('Invite not found:', inviteError?.message);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired invite link' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if invite is already accepted
    if (invite.accepted_at) {
      return new Response(
        JSON.stringify({ error: 'This invite has already been used' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if invite has expired
    if (new Date(invite.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'This invite has expired' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify email matches (case-insensitive)
    if (user.email?.toLowerCase() !== invite.email.toLowerCase()) {
      console.error('Email mismatch:', user.email, invite.email);
      return new Response(
        JSON.stringify({ 
          error: `This invite is for ${invite.email}. Please login with that email address.` 
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user is already a member of this tenant
    const { data: existingMember } = await serviceSupabase
      .from('tenant_members')
      .select('id')
      .eq('user_id', user.id)
      .eq('tenant_id', invite.tenant_id)
      .maybeSingle();

    if (existingMember) {
      // Update the invite as accepted anyway
      await serviceSupabase
        .from('invites')
        .update({ accepted_at: new Date().toISOString() })
        .eq('id', invite.id);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'You are already a member of this workspace'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create tenant membership
    const { error: memberError } = await serviceSupabase
      .from('tenant_members')
      .insert({
        user_id: user.id,
        tenant_id: invite.tenant_id,
        role: invite.role
      });

    if (memberError) {
      console.error('Error creating membership:', memberError);
      return new Response(
        JSON.stringify({ error: 'Failed to create membership' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mark invite as accepted
    await serviceSupabase
      .from('invites')
      .update({ accepted_at: new Date().toISOString() })
      .eq('id', invite.id);

    console.log('Invite accepted successfully for user:', user.id);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Welcome! You now have access to the workspace.',
        role: invite.role
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});