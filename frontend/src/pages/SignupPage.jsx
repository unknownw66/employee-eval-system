import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    staff_id: '',
    email: '',
    password: ''
  });

  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', form);
      setStatus('✅ Signup successful. Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setStatus('❌ Signup failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-center">Employee Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="text"
          name="staff_id"
          placeholder="Staff ID"
          value={form.staff_id}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>

        {status && <p className="text-sm text-center mt-2">{status}</p>}

        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/" className="text-blue-500 underline">Login here</a>
        </p>
      </form>
    </div>
  );
}
