import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log('user-----');
  console.log(await supabase.auth.getUser());

  if (authError || !user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('riskprofile')
    .select('profile_data')
    .eq('user_id', user.id)
    .single();

  if (error && error.code === 'PGRST116') {
    return NextResponse.json({ exists: false });
  } else if (data) {
    return NextResponse.json({ exists: true, profile: data.profile_data });
  } else {
    return NextResponse.json({ error: 'Failed to check profile' }, { status: 500 });
  }
}
