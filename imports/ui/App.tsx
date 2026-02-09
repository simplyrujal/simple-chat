import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRoutes } from './modules/admin/routes';
import { AuthRoutes } from './modules/auth/routes';
import { ChatRoutes } from './modules/chat/routes';
import { RequireAuth } from './shared/components/require-auth';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<ChatRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};
