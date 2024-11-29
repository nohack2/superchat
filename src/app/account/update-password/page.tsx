'use client';

import { useState } from 'react';
import { updatePassword } from '../../actions';
import { useRouter } from 'next/navigation';

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();  // Initialize the Next.js router

  const handlePasswordUpdate = async () => {
    try {
      const response = await updatePassword(newPassword);
      console.log('444444444', response);
      if (response.err) {
        if (response.err.code === 'same_password') {
          setError('New password should be different from the old password.');
        } else {
          setError('Some issue while updating password.');
        }
      } else {
        setSuccess('Password updated successfully.');
        router.push('/');
      }
    } catch (err) {
      setError('Failed to update password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handlePasswordUpdate}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
