import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './admin/routes/AdminRoutes';
import UserRoutes from './user/routes/UserRoutes';

function App() {
  return (
    <Routes>
      {/* Admin Panel Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* User (Customer) Site Routes */}
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
}

export default App;
