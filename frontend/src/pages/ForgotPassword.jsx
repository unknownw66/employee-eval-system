import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reset/request-otp', { email });
      localStorage.setItem('resetEmail', email);
      setStatus('✅ OTP sent to your email.');
      setTimeout(() => navigate('/reset-password'), 1000);
    } catch (err) {
      setStatus('❌ Failed to send OTP.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Send OTP
        </button>
      </form>
      <p className="mt-3 text-sm">{status}</p>
    </div>
  );
}
