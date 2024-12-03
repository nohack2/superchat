import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  try {
    const body = await req.json();
    const { profileData, userId } = body;

    if (!userId || !profileData) {
      return NextResponse.json({ error: 'User ID and profile data are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: userId, ...profileData }, { onConflict: 'user_id' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Profile saved successfully', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
