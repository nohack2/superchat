'use client';

import { useEffect, useState } from 'react';
import { resetPassword, signIn, signUp, resendConfirmation } from '../actions';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResendConfirmation, setIsResendConfirmation] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const router = useRouter();  // Initialize the Next.js router

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const supabase = await createClient();
  //     const { data: { session } } = await supabase.auth.getSession();
  //     if (session) router.push('/');
  //   };
  //   checkSession();
  // }, [router]);

  const handleAuth = async () => {
    setMessage(null);
    try {
      if (isSignUp) {
        const signUpResponse = await signUp(email, password);
        if (signUpResponse.err) {
          const errCode = signUpResponse.err?.code;
          if (errCode === 'UserPendingConfirmation') {
            setMessage('There is an account already with this email. Please resend a confirmation email to verify.');
            setMessageType('error');
            setIsResendConfirmation(true);
          } else if (errCode === 'UserAlreadyExists') {
            setMessage('There is an account already with this email. Please signin.');
            setMessageType('error');
          } else {
            setMessage('An error occurred, please try later.');
            setMessageType('error');
          }
        } else {
          setMessage('Sign-up successful! Please check your email to confirm.');
          setMessageType('success');
        }
      } else {
        const signInResponse  = await signIn(email, password);
        if (signInResponse.err) {
          const errCode = signInResponse.err?.code;
          if (errCode === 'invalid_credentials') {
            setMessage('Please check your credentials.');
            setMessageType('error');
          } else if (errCode === 'email_not_confirmed') {
            setMessage('Please resend a confirmation email to verify and then signin.');
            setMessageType('error');
            setIsResendConfirmation(true);
          } else {
            setMessage('An error occurred whle signin in. Please try later');
            setMessageType('error');
          }
        } else {
          setMessage('Sign-in successful.');
          setMessageType('success');
        }
        router.push('/')
      }
    } catch (err: any) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  };

  const handlePasswordReset = async () => {
    setMessage(null);
    try {
      await resetPassword(email);
      setMessage('Password reset link sent. Check your email.');
      setMessageType('success');
    } catch {
      setMessage('Error sending reset link. Try again.');
      setMessageType('error');
    }
  };

  const handleResendConfirmation = async () => {
    setMessage(null);
    try {
      await resendConfirmation(email);
      setMessage('Confirmation link resent. Check your email.');
      setMessageType('success');
    } catch {
      setMessage('Error resending confirmation. Try again.');
      setMessageType('error');
    }
  };

  const clearMessageAndSwitch = (callback: () => void) => {
    setMessage(null);
    setMessageType(null);
    callback();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isForgotPassword
            ? 'Reset Password'
            : isResendConfirmation
            ? 'Resend Confirmation'
            : isSignUp
            ? 'Sign Up'
            : 'Sign In'}
        </h2>

        {message && (
          <div
            className={`text-center mb-4 ${
              messageType === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </div>
        )}

        {isForgotPassword ? (
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            handlePasswordReset={handlePasswordReset}
          />
        ) : isResendConfirmation ? (
          <ResendConfirmationForm
            email={email}
            setEmail={setEmail}
            handleResendConfirmation={handleResendConfirmation}
          />
        ) : (
          <AuthForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleAuth={handleAuth}
            isSignUp={isSignUp}
          />
        )}

        <div className="flex flex-col items-center justify-between mt-4 space-y-2">
          {!isForgotPassword && !isResendConfirmation && (
            <button
              onClick={() => clearMessageAndSwitch(() => setIsForgotPassword(true))}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          )}

          {isResendConfirmation && (
            <button
              onClick={() => clearMessageAndSwitch(() => {
                setIsResendConfirmation(false); // Switch to Sign In form
                setIsSignUp(false); // Ensure Sign Up is disabled
              })}
              className="text-sm text-blue-500 hover:underline"
            >
              Back to Sign In
            </button>
          )}

          {!isResendConfirmation && (
            <button
              onClick={() =>
                clearMessageAndSwitch(() =>
                  isForgotPassword
                    ? setIsForgotPassword(false)
                    : setIsSignUp((prev) => !prev)
                )
              }
              className="text-sm text-blue-500 hover:underline"
            >
              {isForgotPassword
                ? 'Back to Sign In'
                : isSignUp
                ? 'Already have an account? Sign In'
                : 'Don’t have an account? Sign Up'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AuthForm = ({ email, password, setEmail, setPassword, handleAuth, isSignUp }: any) => (
  <>
    <InputField label="Email" value={email} setValue={setEmail} type="email" />
    <InputField label="Password" value={password} setValue={setPassword} type="password" />
    <button onClick={handleAuth} className="w-full py-2 bg-blue-600 text-white rounded">
      {isSignUp ? 'Sign Up' : 'Sign In'}
    </button>
  </>
);

const ForgotPasswordForm = ({ email, setEmail, handlePasswordReset }: any) => (
  <>
    <InputField label="Email" value={email} setValue={setEmail} type="email" />
    <button onClick={handlePasswordReset} className="w-full py-2 bg-blue-600 text-white rounded">
      Send Reset Link
    </button>
  </>
);

const ResendConfirmationForm = ({ email, setEmail, handleResendConfirmation }: any) => (
  <>
    <InputField label="Email" value={email} setValue={setEmail} type="email" />
    <button
      onClick={handleResendConfirmation}
      className="w-full py-2 bg-blue-600 text-white rounded"
    >
      Resend Confirmation Link
    </button>
  </>
);

const InputField = ({ label, value, setValue, type }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full p-2 border rounded focus:outline-none"
    />
  </div>
);

export default Login;
