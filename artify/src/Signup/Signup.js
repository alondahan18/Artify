import './Signup.css';
import {Link, useNavigate} from "react-router-dom";
import Password from './Password';


function Signup() {

  
    const handleSubmit = (event) => {
      event.preventDefault();
      const displayName = document.getElementById('display-name').value;
      const MyUsername = document.getElementById('username2').value;
      const Mypassword = document.getElementById('psw2').value;
      const repeatPassword = document.getElementById('psw-repeat').value;
  
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
  
    };
  
    
    return (
        <div>
            <h1>Artify</h1>
    
        <form id="myform" onSubmit={handleSubmit}>
            <div className="container">
                <div id="form-header">
                    <h3>Sign up<i class="bi bi-brush"></i></h3>
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
                    <p>Display name:</p>
                    <div>
                        <i className="bi bi-person-vcard" />
                        <input
                            type="text"
                            placeholder="Enter display name"
                            name="display"
                            id="display-name"
                            required
                        />
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
        </div>
    );
}

export default Signup