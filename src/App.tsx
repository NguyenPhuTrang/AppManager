import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import Layout from './layouts';
import useAuthMiddleware from './routes/authMiddleware';

function App() {
    useAuthMiddleware();

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
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