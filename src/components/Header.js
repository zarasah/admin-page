import { NavLink, useNavigate } from 'react-router-dom';
// import Search from './Search';
// import Basket from './Basket';
import './Header.css';
import logo from "../images/logo.jpg";

export default function Header(props) {
    const navigate = useNavigate();
    const userName = props.name;

    function handleClick() {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className = "header">
            <div className = "header-left">
                <div className = "logo">
                    <img src = {logo} alt = "logo"/>
                </div>
                <div className = "navbar">
                    <NavLink to = "/">Home</NavLink>
                    <NavLink to = "/shop">Shop</NavLink>
                    <NavLink to = "/blog">Blog</NavLink>
                    <NavLink to = "/about">About</NavLink>
                    <NavLink to = "/contact">Contact</NavLink>
                </div>
            </div>
            <div className = "header-right">
                {/* <Search search = {props.search}/> */}
                {/* <Basket count = {props.count}/> */}
                <p>Hi, {userName}</p>
                <button onClick = { handleClick }>Log Out</button>
            </div>
        </div>
    );
}