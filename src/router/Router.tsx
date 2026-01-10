import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { pageRoutes } from './pageRoutes';
import RootLayout from '../layouts/RootLayout';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
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
