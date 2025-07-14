import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EvaluationForm from './pages/EvaluationForm';
import RankingsPage from './pages/RankingsPage';
import Notifications from './pages/Notifications';
import EvaluationFormSettings from './pages/EvaluationFormSettings';
import Unauthorized from './pages/Unauthorized';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Employee Routes */}
      <Route element={<PrivateRoute allowedRoles={['employee']} />}>
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/evaluation" element={<EvaluationForm />} />
        <Route path="/rankings" element={<RankingsPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/form-settings" element={<EvaluationFormSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
