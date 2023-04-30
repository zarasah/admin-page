import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isError, setIsError] = useState(false);

    function register(event) {
        event.preventDefault();

        if (!(name && email && password)) {
            setMessage('All fields are required');
            setIsError(true);
            return;
        }

        const data = {
            name,
            email,
            password
        }

        fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(res => {
            if (res.status === 409) {
                setMessage('Email already exists');
                setIsError(true);
                return
            } else {
                setMessage('Congratulations! Your registration was successful.');
                setShowModal(true);
            }
        })
        .catch(error => {console.log(error)})
    }
    
    return (
        <div className="login-page">
            <div className="form">
                {
                    !showModal ? (
                        <form className="register-form" onSubmit = {register}>
                            <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
                            <input type="text" placeholder="Email Address" onChange={(event) => setEmail(event.target.value)}/>
                            <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                            <button>create</button>
                            <p className="message">Already registered? <Link to = "/login">Sign In</Link></p>
                            <p className = {isError ? "error-active" : "error"}>{message}</p>
                        </form>
                    ) : (
                        <div>
                            <p className='registered'>{message}</p>
                            <Link to = "/login">Go to login page</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}