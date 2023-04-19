import './App.css';
import  { Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import NotFound from './components/NotFound';
// import AuthLayout from './layout/AuthLayout';
import AdminLayout from './layout/AdminLayout';
import Admin from './pages/Admin';
import UsersTable from './pages/UsersTable';
import CategoriesTabel from './pages/CategoriesTable';
import ProductsTabel from './pages/ProductsTable';

function App() {
  
  return (
    <Routes>
      <Route path = "/login" element = {<Login />}/>
      <Route path = "/admin" element={<AdminLayout />}>
        <Route index element = {<Admin />}/>
        <Route path = "users" element = {<UsersTable />}/>
        <Route path = "categories" element = {<CategoriesTabel />}/>
        <Route path = "products" element = {<ProductsTabel />}/>
        <Route path = "createcategory" element = {<UsersTable />}/>
        <Route path = "updatecategory" element = {<UsersTable />}/>
        <Route path = "deletecategory" element = {<UsersTable />}/>
        <Route path = "createproduct" element = {<UsersTable />}/>
        <Route path = "updateproduct" element = {<UsersTable />}/>
        <Route path = "deleteproduct" element = {<UsersTable />}/>
      </Route>
      <Route path = "*" element={<NotFound />}/>
    </Routes>
  )
}

export default App;