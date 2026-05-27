import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { Login } from './pages/Login';

import { AdminDashboard } from './pages/AdminDashboard';
import { AdminPackages } from './pages/AdminPackages';
import { AdminCustomers } from './pages/AdminCustomers';
import { AdminManifests } from './pages/AdminManifests';
import { CustomerPortal } from './pages/CustomerPortal';
import { CustomerInvoices } from './pages/CustomerInvoices';
import { StaffView } from './pages/StaffView';
import { StaffIntakeQueue } from './pages/StaffIntakeQueue';
import { StaffWarehouse } from './pages/StaffWarehouse';
import { DriverView } from './pages/DriverView';
import { PublicTrack } from './pages/PublicTrack';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/track" element={<PublicTrack />} />
          
          <Route element={<AppShell />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/packages" element={<AdminPackages />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/manifest" element={<AdminManifests />} />
            
            <Route path="/customer" element={<CustomerPortal />} />
            <Route path="/customer/invoices" element={<CustomerInvoices />} />
            
            <Route path="/staff" element={<StaffIntakeQueue />} />
            <Route path="/staff/scan" element={<StaffView />} />
            <Route path="/staff/packages" element={<StaffWarehouse />} />
            
            <Route path="/driver/*" element={<DriverView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
