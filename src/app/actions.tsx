'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/server'
import { UserAlreadyExists } from '@/errors'

interface SupaError {
  code?: string,
  message?: string
}

interface SigninResponse {
  err?: SupaError,
  data?: any
}

export async function signIn (email: string, password: string) {
  const supabase = await createClient()
  const response: SigninResponse = {};
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) {
    console.error('Error signing in: code', error.code, ', msg:  ', error.message);
    response.err = {code: error.code};
    return response;
  }
  return { data: data };
}

export async function getUser (email: string) {
  console.log(email);
  const supabase = await createAdminClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .limit(1)
  if (error) {
    console.log(error);
    console.error('Error getUser:', error.message);
    return { error: error.message };
  }
  return { user: data[0] };
}

interface Response {
  err?: SupaError,
  data?: any
}

export async function signUp (email: string, password: string) {
  const supabase = await createClient()

  const response: Response = {};
  const userResponse = await getUser(email);
  console.log('userResponse: ', userResponse)
  if (userResponse.user) {
    const user = userResponse.user;
    if (!user.email_confirmed_at) {
      response.err = {code: 'UserPendingConfirmation'}
      return response;
    }
    response.err = {code: 'UserAlreadyExists'}
    return response;
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) {
    console.error('Error signup:', error.message);
    return { err: {message: error.message} };
  }

  return { data };
}

export async function resetPassword(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/account/update-password`,
  });
  if (error) throw new Error(error.message);
}

interface UpdatePasswordResponse {
  err?: SupaError,
  data?: any
}
export async function updatePassword (newPassword: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    return {
      err  : {code: error.code}
    }
  };
  return {};
}

export async function resendConfirmation(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/welcome`
    }
  })
  if (error) throw new Error(error.message);
}
