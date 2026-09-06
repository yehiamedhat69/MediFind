import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './protectedroute';

// استيراد صفحة البحث
import MedicineSearch from './pages/medicine/MedicineSearch';

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية: البحث عن الأدوية */}
        <Route path="/" element={<MedicineSearch />} />

        {/* صفحات عامة */}
        <Route path="/login" element={<div>صفحة تسجيل الدخول</div>} />
        <Route path="/unauthorized" element={<div>غير مصرح لك بالدخول</div>} />

        {/* 🔒 مسارات محمية حسب الـ Role */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route path="/patient-dashboard" element={<div>لوحة المريض</div>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<div>لوحة الأدمن</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
