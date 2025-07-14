// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-100 dark:bg-gray-900 flex justify-between items-center text-black dark:text-white">
      <div className="font-bold text-lg">
        Employee Eval System
      </div>

      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/evaluation" className="hover:underline">Evaluation</Link>
        <Link to="/notifications" className="text-blue-500 hover:underline">
          🔔 Notifications
        </Link>

        {/* 🌙 Theme Switch Button */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
