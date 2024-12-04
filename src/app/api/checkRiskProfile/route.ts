import { createClient} from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('riskprofile')
    .select('profile_data')
    .eq('user_id', user.id)
    .limit(1);

  if (error) {
    return NextResponse.json({ error: 'Failed to check profile' }, { status: 500 });
  } else if (data) {
    // if rls is enabled without any policy on the table, you still get data as empty array [] irrespective of user having an entry in the riskprofile table
    // So I am not sure why we dont get an error when rls policy is not configured instead of getting empty data which gives an illusion of working code.
    let profileExists = false;
    if (data.length > 0) {
      profileExists = true;
    }
    return NextResponse.json({ exists: profileExists });
  } else {
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
