import { Link } from 'react-router-dom';
import './Dashboard.css'

export default function Sidebar() {
    return (
        <div className = "sidebar">
            <h4>Dashboard</h4>
                <ul>
                    <li><Link to = "/admin">Home</Link></li>
                    <li><Link to = "/admin/users">Users Tabel</Link></li>
                    <li><Link to = "/admin/categories">Categories Tabel</Link></li>
                    <li><Link to = "/admin/products">Products Tabel</Link></li>
                </ul>
        </div>
    );
}