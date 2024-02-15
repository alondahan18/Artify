import './Signup.css';
import {Link} from "react-router-dom";
import Password from './Password';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate();
    const [gender, setGender] = useState('male');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
  
    const handleSubmit =async (event) => {
      event.preventDefault();
      const Mypassword = document.getElementById('psw2').value;
      const repeatPassword = document.getElementById('psw-repeat').value;
      const username = document.getElementById('username2').value;
      const password = document.getElementById('psw2').value;
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
        

      const formData = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender // Assuming you want to send the selected gender
      };

      if (Mypassword !== repeatPassword) {
        alert('Passwords do not match!');
        return;
      }
  
      if (Mypassword.length < 8 || Mypassword.length > 16) {
        alert('Password should be between 8 and 16 characters long!');
        return;
      }
  
      if (repeatPassword.length < 8 || repeatPassword.length > 16) {
        alert('Password should be between 8 and 16 characters long!');
        return;
      }


      try {
        const response = await fetch('http://localhost:5000/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration failed');
        }
    
        
        // Optionally, you can redirect the user to another page after successful registration
        navigate('/');
      } catch (error) {
        alert(error.message);
      }
    
  
    };
  
    
    return (
        <body className="page-signup">
            <h1>Artify</h1>
    
        <form id="myform" onSubmit={handleSubmit}>
            <div className="container">
                <div id="form-header">
                    <h3>Sign up<i className="bi bi-brush"></i></h3>
                </div>
                <div id="form-body">
                    <p>Username:</p>
                    <div>
                        <i className="bi bi-person-circle" />
                        <input
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            id="username2"
                            required
                        />
                    </div>
                    <Password />
                    <p>First Name:</p>
                    <div>
                        <i className="bi bi-person-vcard-fill" />
                        <input
                            type="text"
                            placeholder="Enter first name"
                            name="first"
                            id="first-name"
                            required
                        />
                    </div>

                    <p>Last Name:</p>
                    <div>
                        <i className="bi bi-person-vcard-fill" />
                        <input
                            type="text"
                            placeholder="Enter last name"
                            name="last"
                            id="last-name"
                            required
                        />
                    </div>
                    <p>Gender:</p>
            <div>
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                />{' '}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                />{' '}
                Female
              </label>
            </div>

                </div>

                <div id="form-footer">

                    <button  type="submit" className="btn btn-warning signupBtn" id="register">
                        Register
                    </button>

                    <p>
                        Already have an account? <Link to="/"> Sign in</Link>
                    </p>
                </div>
            </div>
        </form>
        </body>
    );
}

export default Signup