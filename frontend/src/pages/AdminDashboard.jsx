import { useEffect, useState } from 'react';
import API from '../api/axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function AdminDashboard() {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEval, setSelectedEval] = useState(null);
  const [rankData, setRankData] = useState({ user_id: '', score: '', rank: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get('/evaluation/all');
      setEvaluations(res.data);
    } catch (err) {
      alert('Error fetching evaluations');
    }
  };

  const exportToExcel = () => {
  const rows = evaluations.map(e => ({
    'Staff ID': e.staff_id,
    'Name': e.name,
    'Total Score': e.total_score,
    'Submitted At': new Date(e.submitted_at).toLocaleString()
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Evaluations");

  XLSX.writeFile(workbook, "Evaluation_Report.xlsx");
};

const exportToPDF = () => {
  const doc = new jsPDF();

  const tableData = evaluations.map(e => [
    e.staff_id, e.name, e.total_score, new Date(e.submitted_at).toLocaleString()
  ]);

  doc.text("Evaluation Report", 14, 15);
  doc.autoTable({
    head: [["Staff ID", "Name", "Score", "Submitted At"]],
    body: tableData,
    startY: 20
  });

  doc.save("Evaluation_Report.pdf");
};


  const handleRankSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/rankings/update', rankData);
      alert("✅ Ranking updated");
      setRankData({ user_id: '', score: '', rank: '' });
    } catch (err) {
      alert("Error updating rank");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2">Employee Evaluations</h2>
      <table className="w-full text-sm border mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Staff ID</th>
            <th>Name</th>
            <th>Score</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-2">{e.staff_id}</td>
              <td>{e.name}</td>
              <td>{e.total_score}</td>
              <td>
                <button
                  className="text-blue-500 underline"
                  onClick={() => setSelectedEval(e)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex gap-4 mt-4">
  <button
    onClick={exportToExcel}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    📊 Export to Excel
  </button>

  <button
    onClick={exportToPDF}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    🧾 Export to PDF
  </button>
</div>


      {selectedEval && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h3 className="text-lg font-semibold">Evaluation Details for {selectedEval.name}</h3>
          <p><strong>Part II:</strong> {JSON.stringify(selectedEval.part_ii)}</p>
          <p><strong>Part III:</strong> {JSON.stringify(selectedEval.part_iii)}</p>
          <p><strong>Part IV:</strong> {JSON.stringify(selectedEval.part_iv)}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Update Rankings</h2>
      <form onSubmit={handleRankSubmit} className="space-y-2 max-w-md">
        <input
          type="number"
          placeholder="User ID"
          className="w-full p-2 border"
          value={rankData.user_id}
          onChange={(e) => setRankData({ ...rankData, user_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Score"
          className="w-full p-2 border"
          value={rankData.score}
          onChange={(e) => setRankData({ ...rankData, score: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rank"
          className="w-full p-2 border"
          value={rankData.rank}
          onChange={(e) => setRankData({ ...rankData, rank: e.target.value })}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Ranking
        </button>
      </form>
    </div>

    
  );
}
