import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRoutes } from './modules/admin/routes';
import { AuthRoutes } from './modules/auth/routes';
import { ChatRoutes } from './modules/chat/routes';

export const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<ChatRoutes />} />
    </Routes>
  </BrowserRouter>
);
