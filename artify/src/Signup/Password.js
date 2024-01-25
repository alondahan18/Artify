import React, { useState } from 'react';

function Password() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validLength, setValidLength] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setValidLength(event.target.value.length >= 8 && event.target.value.length <= 16);
    if (confirmPassword !== '') {
      setPasswordsMatch(event.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(event.target.value === password);
  };

  return (
    <>
      <p>Password:</p>
      <div>
        <i className="bi bi-lock-fill" />
        <input
          type="password"
          placeholder="Enter password"
          name="psw"
          id="psw2"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        {!validLength && (
          <p style={{ color: 'red' }}>Password must be between 8 and 16 characters</p>
        )}
        {validLength && !passwordsMatch && confirmPassword !== '' && (
          <p style={{ color: 'red' }}>Passwords do not match</p>
        )}
        {validLength && passwordsMatch && confirmPassword !== '' && (
          <p style={{ color: 'green' }}>Good</p>
        )}
      </div>
      <p>Confirm password:</p>
      <div>
        <i className="bi bi-arrow-repeat" />
        <input
          type="password"
          placeholder="Confirm password"
          name="psw-repeat"
          id="psw-repeat"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {!validLength && confirmPassword !== '' && (
          <p style={{ color: 'red' }}>Password must be between 8 and 16 characters</p>
        )}
        {validLength && !passwordsMatch && (
          <p style={{ color: 'red' }}>Passwords do not match</p>
        )}
        {validLength && passwordsMatch && confirmPassword !== '' && (
          <p style={{ color: 'green' }}>Good</p>
        )}
      </div>
    </>
  );
}

export default Password;
