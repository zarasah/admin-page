import { Outlet, Navigate } from 'react-router-dom';

export default function AdminLayout() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        if (user.jwt && user.role === 1) {
            return <Outlet />
        }
    }
    return <Navigate to="/login" replace={true} />;
}