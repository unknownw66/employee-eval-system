import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function RankingsPage() {
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    API.get('/rankings/all').then((res) => setRanks(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🏆 Global Rankings</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Rank</th>
            <th>Name</th>
            <th>Staff ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((r) => (
            <tr key={r.user_id}>
              <td className="text-center">{r.rank}</td>
              <td>{r.name}</td>
              <td>{r.staff_id}</td>
              <td className="text-center">{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
