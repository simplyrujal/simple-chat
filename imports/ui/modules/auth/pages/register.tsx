import { zodResolver } from '@hookform/resolvers/zod';
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useLogin from '../../../shared/hooks/auth/use-login';
import { RegisterFormValues, registerSchema } from '../schemas';

const COUNTRIES = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Switzerland', 'Austria', 'Belgium', 'Ireland', 'Portugal',
    'Poland', 'Czech Republic', 'Greece', 'Japan', 'South Korea', 'Singapore',
    'New Zealand', 'India', 'Brazil', 'Mexico', 'Argentina', 'Chile',
    'Nepal', 'China', 'Russia', 'Other'
];

const Register: React.FC = () => {
    const [submitting, setSubmitting] = useState(false);
    const { login } = useLogin();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setSubmitting(true);

        try {
            await Meteor.callAsync('user.register', {
                username: data.username,
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                password: data.password,
                country: data.country,
            });

            login({ email: data.email, password: data.password });
        } catch (err: any) {
            setError('root', {
                type: 'manual',
                message: err.reason || err.message || 'Registration failed. Please try again.'
            });
            setSubmitting(false);
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

                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {errors.root && <Alert variant="danger" className="py-2 small">{errors.root.message}</Alert>}

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="fname">
                                            <Form.Label className="small fw-semibold">First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="John"
                                                {...register('fname')}
                                                isInvalid={!!errors.fname}
                                                disabled={submitting}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.fname?.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="lname">
                                            <Form.Label className="small fw-semibold">Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Doe"
                                                {...register('lname')}
                                                isInvalid={!!errors.lname}
                                                disabled={submitting}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lname?.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="small fw-semibold">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="johndoe"
                                        {...register('username')}
                                        isInvalid={!!errors.username}
                                        disabled={submitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="small fw-semibold">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@company.com"
                                        {...register('email')}
                                        isInvalid={!!errors.email}
                                        disabled={submitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="password">
                                            <Form.Label className="small fw-semibold">Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="••••••••"
                                                {...register('password')}
                                                isInvalid={!!errors.password}
                                                disabled={submitting}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password?.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="confirmPassword">
                                            <Form.Label className="small fw-semibold">Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="••••••••"
                                                {...register('confirmPassword')}
                                                isInvalid={!!errors.confirmPassword}
                                                disabled={submitting}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword?.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4" controlId="country">
                                    <Form.Label className="small fw-semibold">Country</Form.Label>
                                    <Form.Select
                                        {...register('country')}
                                        isInvalid={!!errors.country}
                                        disabled={submitting}
                                    >
                                        <option value="">Select your country</option>
                                        {COUNTRIES.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.country?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mb-3 py-2 fw-bold" disabled={submitting}>
                                    {submitting ? 'Creating Account...' : 'Sign Up'}
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