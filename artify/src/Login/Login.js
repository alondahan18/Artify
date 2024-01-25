import React from 'react';
import './Login.css'
import {Link} from "react-router-dom";





  
function Login() {

    const handleSubmit = (event) => {
        
    };
    return (
        <>
            <h1>Artify</h1>
            <form onSubmit={handleSubmit}>
                <div id="container2">
                    <div id="form-header2">
                        <h3>Login<i class="bi bi-brush"></i></h3>
                    </div>
                    <div id="form-body2">
                        <p>Username:</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                id="username"
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
                                required
                            />
                        </div>
                    </div>
                    <div id="form-footer2">
                        <button id="loginBtn" type="submit2" className="btn btn-warning">
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
export default Login
