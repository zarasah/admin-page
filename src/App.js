import './App.css';
import  { Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
// import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';
import UserLayout from './layout/UserLayout';
import Admin from './pages/Admin';
import UsersTable from './pages/UsersTable';
import CategoriesTabel from './pages/CategoriesTable';
import ProductsTabel from './pages/ProductsTable';
import User from './pages/User';

function App() {
  
  return (
    <div className = "container">
    <Routes>
      <Route path = "/login" element = {<Login />}/>
      <Route path = "/register" element = {<Register />}/>
      <Route path = "/admin" element={<AdminLayout />}>
        <Route index element = {<Admin />}/>
        <Route path = "users" element = {<UsersTable />}/>
        <Route path = "categories" element = {<CategoriesTabel />}/>
        <Route path = "products" element = {<ProductsTabel />}/>
      </Route>
      <Route path = "/user" element={<UserLayout />}>
        <Route index element = {<User />}/>
      </Route>
      <Route path = "*" element={<NotFound />}/>
    </Routes>
    </div>
  )
}

export default App;