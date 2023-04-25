import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

export default function AdminLayout() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        if (user.jwt && user.role === 1) {
            return (
                <>
                    <Header />
                    <div className = "wrapper">
                        <Dashboard />
                        <div className = "main">
                            <Outlet /> 
                        </div>
                    </div>                   
                </>
            )
        }
    }
    return <Navigate to="/login" replace={true} />;
}