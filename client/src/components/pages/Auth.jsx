import { useState } from 'react';
import axios from 'axios';
import { setToken } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profile_pic: 'https://via.placeholder.com/300',
  });

  const [error, setError] = useState('');

  const [isSignup, setIsSignUp] = useState(true);

  const switchStatus = () => {
    setIsSignUp((previousState) => !previousState);
  };

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isSignup) {
        const { username, email, password, passwordConfirmation, profile_pic } = formData;
        await axios.post('/api/auth/register/', {
          username,
          email,
          password,
          password_confirmation: passwordConfirmation,
          profile_pic
        });
        switchStatus();
      } else {
        const { data } = await axios.post('/api/auth/login/', {
          username: formData.username,
          password: formData.password,
        });

        setToken(data.access); // Assuming your setToken function handles storing the access token
        navigate('/homefeed');
      }
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <div className="auth-container">
      <div className="form-page flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div>
          <img src="https://www.svgrepo.com/show/506724/lock.svg" alt="lock" width="100px" />
        </div>
        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-floating mb-3">
              <input type="text" className="form-control" name="username" id="username" placeholder="Username" onChange={handleChange} value={formData.username} />
              <label htmlFor="username">Username</label>
            </div>
          )}
          <div className="form-floating mb-3">
            <input type="email" className="form-control" name="email" id="email" placeholder="Email" onChange={handleChange} value={formData.email} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={handleChange} value={formData.password} />
            <label htmlFor="password">Password</label>
          </div>
          {isSignup && (
            <div className="form-floating mb-3">
              <input type="password" className="form-control" name="passwordConfirmation" id="passwordConfirmation" placeholder="Confirm Password" onChange={handleChange} value={formData.passwordConfirmation} />
              <label htmlFor="passwordConfirmation">Confirm Password</label>
            </div>
          )}
          <button type="submit" className="btn btn-teal mt-3">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
          <div className="text-center">
            {error && (
              <p className="text-center mt-3 text-danger">
                {error.email || error.username || error.message || 'Invalid details. Please try again'}
              </p>
            )}
            <div>
              <button type="button" className="btn dynamic m-4" onClick={switchStatus}>
                {isSignup ? 'Already have an account? Sign In' : 'New here? Create an Account'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


