import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      res.data.user.role === 'admin' ? navigate('/admin') : navigate('/dashboard');
    } catch (err) {
      setStatus('❌ Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-all duration-500 relative overflow-hidden">
      {/* Remove the manual dark mode div */}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Branding */}
      <div className="mb-8 text-center z-10 animate-fade-in">
        <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl mb-4">
          <h1 className="text-4xl font-black text-white bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Maharaja Institute of Technology
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Employee Evaluation System</p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="group relative px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 dark:border-gray-600"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            {theme === 'light' ? '🌙' : '☀️'}
            <span className="hidden sm:inline">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </span>
        </button>
      </div>

      {/* Enhanced Form Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-md p-10 space-y-6 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl z-10"
      >
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Welcome Back
          </h2>
          
          {/* Email Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 group-hover:border-blue-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 group-hover:border-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              Sign In
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          {/* Status Message */}
          {status && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 animate-shake">
              <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">{status}</p>
            </div>
          )}

          {/* Links */}
          <div className="text-center space-y-3 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Forgot your password?{' '}
              <Link 
                to="/forgot-password" 
                className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium hover:underline transition-colors duration-200"
              >
                Reset it here
              </Link>
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium hover:underline transition-colors duration-200"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400 z-10">
        <p>© 2025 Maharaja Institute of Technology. All rights reserved.</p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}