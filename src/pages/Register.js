import './Login.css';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div class="login-page">
            <div class="form">
                <form class="register-form">
                    <input type="text" placeholder="Email Address"/>
                    <input type="password" placeholder="Password"/>
                    <button>create</button>
                    <p class="message">Already registered? <Link to = "/login">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}