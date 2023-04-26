import './Login.css';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        
        if (!email || !password) {
            setMessage('All fields are required');
            setIsError(true);
            return;
        }

        const data = {
            email,
            password
        }

        fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(res => {
            if (res.status === 401) {
                setMessage('Incorrect email or password');
                setIsError(true);
            }
            return res.json();
        })
        .then(res => {
            const user = JSON.stringify(res);
            localStorage.setItem('user', user);
            
            if (res.role === 1) {
                navigate('/admin');
            } else if (res.role === 0){
                navigate('/user');
            } else {
                navigate('/login');
            }
        })
        .catch(error => {console.log(error)})
    }

    return (
        <div className = "login-page">
            <div className = "form">
                <form className = "login-form" onSubmit={handleSubmit}>
                    <input type = "email" placeholder = "Email Address*" onChange={(event) => setEmail(event.target.value)}  required />
                    <input type = "password" placeholder = "Password*" onChange={(event) => setPassword(event.target.value)}  required />
                    <button>Sign In</button>
                    <p className = "message" >Not registered? <Link to = "/register">Create an account</Link></p>
                    <p className = {isError ? "error-active" : "error"}>{message}</p>
                </form>
            </div>
        </div>
    )
}