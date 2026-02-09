import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminRoutes } from './modules/admin/routes';
import { AuthRoutes } from './modules/auth/routes';
import { ChatRoutes } from './modules/chat/routes';
import { RequireAuth } from './shared/components/require-auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
