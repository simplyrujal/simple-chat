import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
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
                fname,
                lname,
                email,
                password,
                country,
            });

            login({ email, password });

        } catch (error: any) {
            setError(error.reason || error.message || 'Registration failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    <Card className="shadow-sm border-0 p-4">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <h1 className="h3 mb-2 fw-bold">Create Account</h1>
                                <p className="text-muted small">Join us and start chatting with others</p>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="fname">
                                            <Form.Label className="small fw-semibold">First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="John"
                                                value={fname}
                                                onChange={(e) => setFname(e.target.value)}
                                                required
                                                disabled={loading}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="lname">
                                            <Form.Label className="small fw-semibold">Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Doe"
                                                value={lname}
                                                onChange={(e) => setLname(e.target.value)}
                                                required
                                                disabled={loading}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="small fw-semibold">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="johndoe"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={loading}
                                        minLength={3}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="small fw-semibold">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label className="small fw-semibold">Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                disabled={loading}
                                                minLength={6}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="confirmPassword">
                                            <Form.Label className="small fw-semibold">Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                disabled={loading}
                                                minLength={6}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4" controlId="country">
                                    <Form.Label className="small fw-semibold">Country</Form.Label>
                                    <Form.Select
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
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mb-3 py-2 fw-bold" disabled={loading}>
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </Button>
                            </Form>

                            <div className="text-center small">
                                Already have an account? <Link to="/auth/login" className="text-decoration-none fw-bold">Sign In</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;