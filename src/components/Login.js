import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        
        if (!email || !password) {
            console.log('fields are required');
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
        .then(res => res.json())
        .then(res => {
            const user = JSON.stringify(res);
            localStorage.setItem('user', user);
            
            if (res.role === 1) {
                navigate('/admin');
            } else {
                navigate('/login');
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type = "email" placeholder = "Email Address*" onChange={(event) => setEmail(event.target.value)}  required />
            <br />
            <input type = "password" placeholder = "Password*" onChange={(event) => setPassword(event.target.value)}  required />
            <br />
            <button>Sign In</button>
        </form>
    )
}