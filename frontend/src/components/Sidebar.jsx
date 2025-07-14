// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-100 p-4 space-y-4">
      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/evaluation">📝 Evaluation</Link>
      <Link to="/notifications" className="text-blue-600 font-medium">🔔 Notifications</Link>
    </div>
  );
}
