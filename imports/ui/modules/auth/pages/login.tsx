import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '/imports/ui/shared/hooks/auth/use-login';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    login({ email, password })
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error.message}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
        <div className="login-link">
          Don't have an account? <Link to="/auth/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login