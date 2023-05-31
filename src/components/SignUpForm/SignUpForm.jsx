import './SignUpForm.css';
import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { useNavigate } from 'react-router-dom'

export default function SignUpForm(props) {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setError('');
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirm':
        setConfirm(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = {
        name,
        email,
        password,
      };
      const user = await signUp(formData);
      props.setUser(user);
      console.log("user", user)
      navigate('/boards');
    } catch {
      setError('Sign Up Failed - Try Again');
    }
  };

  const disable = password !== confirm;

  return (
    <div>
      <div className="form-container">
        <h1 className="sign-in-h1">yes you cancan!</h1>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} required />
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={handleChange} required />
          <label>Confirm</label>
          <input type="password" name="confirm" value={confirm} onChange={handleChange} required />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}