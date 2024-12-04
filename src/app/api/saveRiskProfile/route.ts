import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const { data: existingProfile, error: checkError } = await supabase
    .from('riskprofile')
    .select('id')
    .eq('user_id', user.id)
    .limit(1);

  if (checkError) {
    return NextResponse.json({ error: 'Error checking profile' }, { status: 500 });
  }

  const body = await request.json();
  const profileData = body.profileData;
  // TODO: validate profile data if empty
  if (existingProfile && existingProfile.length > 0) {
    // Update the existing record with new JSON data
    const { error: updateError } = await supabase
      .from('riskprofile')
      .update({ profile_data: profileData })
      .eq('user_id', user.id);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
  } else {
    // Insert a new record with JSON data
    const { error: insertError } = await supabase
      .from('riskprofile')
      .insert({
        user_id: user.id,
        profile_data: profileData
      });
    console.log(insertError);
    if (insertError) {
      return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
