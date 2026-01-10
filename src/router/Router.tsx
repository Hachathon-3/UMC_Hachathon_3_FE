import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pageRoutes } from './pageRoutes';
import Layout from '../components/Layout';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    {pageRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
