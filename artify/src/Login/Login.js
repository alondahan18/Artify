import React from 'react';
import './Login.css'
import {Link, useNavigate} from "react-router-dom";




async function send(Username, Password) {
    const data = {
      username: Username,
      password: Password,
    };
  
    const response = await fetch('http://localhost:5000/api/Tokens', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      const token = await response.text();
      return token;
    } else {
      throw new Error('Invalid username or password');
    }
  }
  
  async function sendRequest(username, password) {
    try {
      const token = await send(username, password);
      return token;
    } catch (error) {
      throw error;
    }
  }
  
  
  
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
