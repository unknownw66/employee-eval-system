import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reset/reset-password', {
        email, otp, newPassword
      });
      setStatus('✅ Password reset successful!');
      setTimeout(() => navigate('/'), 1500); // redirect to login
    } catch {
      setStatus('❌ Invalid OTP or error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Reset Password
        </button>
      </form>
      <p className="mt-3 text-sm">{status}</p>
    </div>
  );
}
