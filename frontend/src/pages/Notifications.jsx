import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await API.get('/notifications');
    setNotifications(res.data);
  };

  const markAsRead = async (id) => {
    await API.put(`/notifications/${id}/read`);
    fetchNotifications();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">🔔 Notifications</h1>
      {notifications.length === 0 && <p>No notifications.</p>}
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li key={n.id} className={`p-4 border rounded ${n.read ? 'bg-white' : 'bg-yellow-100'}`}>
            <p>{n.message}</p>
            <small className="block text-gray-500">{new Date(n.created_at).toLocaleString()}</small>
            {!n.read && (
              <button
                className="mt-2 text-sm text-blue-600 underline"
                onClick={() => markAsRead(n.id)}
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
