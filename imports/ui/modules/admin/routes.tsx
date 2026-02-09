import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Info from './pages/info';

export const AdminRoutes: React.FC = () => (
    <Routes>
        <Route path="info" element={<Info />} />
    </Routes>
);
