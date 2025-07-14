import { useState, useEffect } from 'react';
import API from '../api/axios';

export default function EvaluationFormSettings() {
  const [config, setConfig] = useState({
    part_ii_weight: 70,
    part_iii_weight: 20,
    part_iv_weight: 10
  });

  const [status, setStatus] = useState('');

  useEffect(() => {
    API.get('/form-settings')
      .then(res => {
        if (res.data?.config) {
          setConfig(res.data.config);
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/form-settings', { config });
      setStatus('✅ Formula updated successfully.');
    } catch {
      setStatus('❌ Failed to update.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Evaluation Formula Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Part II Weight (%)" value={config.part_ii_weight}
          onChange={v => setConfig({ ...config, part_ii_weight: +v })} />
        <Field label="Part III Weight (%)" value={config.part_iii_weight}
          onChange={v => setConfig({ ...config, part_iii_weight: +v })} />
        <Field label="Part IV Weight (%)" value={config.part_iv_weight}
          onChange={v => setConfig({ ...config, part_iv_weight: +v })} />
        <button className="bg-blue-600 text-white px-6 py-2 rounded">Save</button>
      </form>
      <p className="mt-3 text-green-700 font-medium">{status}</p>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />
    </div>
  );
}
