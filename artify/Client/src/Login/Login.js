import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { useToken } from '../TokenContext';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useToken();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed: Wrong username or password');
            }

            // If login is successful, navigate to home page
            const responseData = await response.json();
            const token = responseData.access_token;
            setToken(token);
            navigate('/Filters', { state: {token: token}});
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <h1>Artify</h1>
            <form onSubmit={handleSubmit}>
                <div id="container2">
                    <div id="form-header2">
                        <h3>Login<i className="bi bi-brush"></i></h3>
                    </div>
                    <div id="form-body2">
                        <p>Username:</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <p id="passTitle2">Password:</p>
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                name="psw"
                                id="psw"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div id="form-footer2">
                        <button id="loginBtn" type="submit" className="btn btn-warning">
                            Log in
                        </button>
                        <p>
                            Not a member? <Link to="/Signup"> Sign up</Link>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Login;
