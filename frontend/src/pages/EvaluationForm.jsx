import { useState, useContext } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function EvaluationForm() {
  const [form, setForm] = useState({
    part_ii: {
      teaching: '',
      student_feedback: '',
      pass_percentage: '',
    },
    part_iii: {
      publications: '',
      projects: '',
    },
    part_iv: {
      punctuality: '',
      mentoring: '',
    },
    total_score: 0,
  });

  const navigate = useNavigate();

  const handleChange = (section, field, value) => {
    const updated = {
      ...form,
      [section]: { ...form[section], [field]: value },
    };

    // Optional: auto-calculate total
    const partIIScore = Object.values(updated.part_ii).reduce((a, b) => +a + +b, 0);
    const partIIIScore = Object.values(updated.part_iii).reduce((a, b) => +a + +b, 0);
    const partIVScore = Object.values(updated.part_iv).reduce((a, b) => +a + +b, 0);

    updated.total_score = (
      (partIIScore / 350) * 70 +
      (partIIIScore / 170) * 20 +
      (partIVScore / 180) * 10
    ).toFixed(2);

    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/evaluation', form);
    alert("✅ Form Submitted!");
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold">Part II: Teaching & Evaluation</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Teaching (Max 320)" value={form.part_ii.teaching}
          onChange={(v) => handleChange('part_ii', 'teaching', v)} />
        <Input label="Student Feedback (Max 40)" value={form.part_ii.student_feedback}
          onChange={(v) => handleChange('part_ii', 'student_feedback', v)} />
        <Input label="% Pass Score (API)" value={form.part_ii.pass_percentage}
          onChange={(v) => handleChange('part_ii', 'pass_percentage', v)} />
      </div>

      <h2 className="text-xl font-bold mt-6">Part III: R&D Contributions</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Publications" value={form.part_iii.publications}
          onChange={(v) => handleChange('part_iii', 'publications', v)} />
        <Input label="Projects" value={form.part_iii.projects}
          onChange={(v) => handleChange('part_iii', 'projects', v)} />
      </div>

      <h2 className="text-xl font-bold mt-6">Part IV: Admin & Behavior</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Punctuality" value={form.part_iv.punctuality}
          onChange={(v) => handleChange('part_iv', 'punctuality', v)} />
        <Input label="Mentoring" value={form.part_iv.mentoring}
          onChange={(v) => handleChange('part_iv', 'mentoring', v)} />
      </div>

      <div className="mt-6">
        <strong>Total API Score (auto-calculated):</strong> {form.total_score} / 100
      </div>

      <button className="bg-blue-600 text-white px-6 py-2 rounded" type="submit">
        Submit Evaluation
      </button>
    </form>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-2 py-1"
      />
    </div>
  );
}
