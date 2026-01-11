import { Navigate, useLocation } from 'react-router-dom';


interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isAuthenticated = true;
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
