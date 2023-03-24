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
      navigate('/');
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











// import './SignUpForm.css'
// import { Component } from 'react'
// import { signUp } from '../../utilities/users-service'

// export default class SignUpForm extends Component {
//   state = {
//     name: '',
//     email: '',
//     password: '',
//     confirm: '',
//     error: '',
//   }
  
//   handleChange = (evt) => {
//       this.setState({
//           [evt.target.name]: evt.target.value,
//           error: ''
//       })
//   }

//   handleSubmit = async (evt) => {
//       evt.preventDefault()
//       try {
//         const formData = {
//           name: this.state.name,
//           email: this.state.email,
//           password: this.state.password
//         }
//         const user = await signUp(formData)
//         this.props.setUser(user)
        
//       } catch {
//         this.setState({ error: 'Sign Up Failed - Try Again' })
//       }
//   } 

//   render() {
//     const disable = this.state.password !== this.state.confirm

//     return (
//       <div>
//           <div className="form-container">
//           <h1 className="sign-in-h1">yes you cancan!</h1>
//             <form autoComplete="off" onSubmit={this.handleSubmit}>
//               <label>Name</label>
//               <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
//               <label>Email</label>
//               <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
//               <label>Password</label>
//               <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
//               <label>Confirm</label>
//               <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
//               <button type="submit" disabled={disable}>SIGN UP</button>
//             </form>
//           </div>
//           <p className="error-message">&nbsp{this.state.error}</p>
//       </div>
//     )
//   }
// }