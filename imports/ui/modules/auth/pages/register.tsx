import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import useLogin from '../../../shared/hooks/auth/use-login';

const COUNTRIES = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Switzerland', 'Austria', 'Belgium', 'Ireland', 'Portugal',
    'Poland', 'Czech Republic', 'Greece', 'Japan', 'South Korea', 'Singapore',
    'New Zealand', 'India', 'Brazil', 'Mexico', 'Argentina', 'Chile',
    'Nepal', 'China', 'Russia', 'Other'
];

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (!country) {
            setError('Please select a country');
            return;
        }

        setLoading(true);

        try {
            await Meteor.callAsync('user.register', {
                username,
                email,
                password,
                country,
            });

            // Auto-login after registration using the hook
            login({ email, password });

        } catch (error: any) {
            setError(error.reason || error.message || 'Registration failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Join us and start chatting with others</p>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="johndoe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                            minLength={3}
                        />
                    </div>

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
                            disabled={loading}
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
                            disabled={loading}
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            minLength={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select
                            id="country"
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            disabled={loading}
                        >
                            <option value="">Select your country</option>
                            {COUNTRIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div className="login-link">
                    Already have an account? <a href="/login">Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default Register;