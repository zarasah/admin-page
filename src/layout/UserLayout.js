import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';

export default function AdminLayout() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        if (user.jwt && user.role === 0) {
            return (
                <>
                    <Header name = {user.name}/>
                    <div className = "wrapper">
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