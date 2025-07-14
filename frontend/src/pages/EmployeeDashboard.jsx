import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const [evaluation, setEvaluation] = useState(null);
  const [rank, setRank] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    API.get('/evaluation/me')
      .then(res => setEvaluation(res.data[0]))
      .catch(() => setEvaluation(null));

    API.get('/rankings/me')
      .then(res => setRank(res.data))
      .catch(() => setRank(null));

    API.get('/notifications')
      .then(res => setNotifications(res.data.slice(0, 3))) // show latest 3
      .catch(() => setNotifications([]));
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        👋 Welcome, {user?.name}
      </h1>

      {/* Profile Info */}
      <div className="bg-white dark:bg-gray-800 border p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">👤 Profile</h2>
        <p><strong>Staff ID:</strong> {user?.staff_id}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      {/* Evaluation Status */}
      <div className="bg-white dark:bg-gray-800 border p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">📝 Evaluation Status</h2>
        {evaluation ? (
          <>
            <p><strong>Score:</strong> {evaluation.total_score}</p>
            <p><strong>Submitted At:</strong> {new Date(evaluation.submitted_at).toLocaleString()}</p>
            <Link to="/evaluation" className="text-blue-500 underline mt-2 block">🔁 Edit Submission</Link>
          </>
        ) : (
          <Link to="/evaluation" className="text-blue-500 underline">🚀 Fill your evaluation form</Link>
        )}
      </div>

      {/* Ranking Info */}
      <div className="bg-white dark:bg-gray-800 border p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">🏆 Your Ranking</h2>
        {rank ? (
          <>
            <p><strong>Rank:</strong> {rank.rank}</p>
            <p><strong>Score:</strong> {rank.score}</p>
            <p><small>Updated on {new Date(rank.updated_at).toLocaleString()}</small></p>
          </>
        ) : (
          <p>Not ranked yet.</p>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 border p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">🔔 Recent Notifications</h2>
        {notifications.length > 0 ? (
          <ul className="list-disc pl-5">
            {notifications.map(n => (
              <li key={n.id} className={n.read ? 'text-gray-400' : 'text-black dark:text-white'}>
                {n.message}
                <br />
                <small className="text-gray-500">{new Date(n.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent notifications.</p>
        )}
        <Link to="/notifications" className="text-blue-500 underline mt-2 block">
          📬 View all notifications
        </Link>
      </div>
    </div>
  );
}
