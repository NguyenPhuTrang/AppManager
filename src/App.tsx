import React, { useEffect } from 'react';
import { publicRoutes } from './routes';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts';
import useAuthMiddleware from './routes/authMiddleware';
import { useUserStore } from './features/auth/stores';

function App() {
  const { getUserProfile } = useUserStore();
  useAuthMiddleware();
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
