import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginFormValues, loginSchema } from '../schemas';
import useLogin from '/imports/ui/shared/hooks/auth/use-login';

const Login: React.FC = () => {
  const { login, isLoading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-sm border-0 p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h1 className="h3 mb-2 fw-bold">Welcome Back</h1>
                <p className="text-muted small">Sign in to your account to continue</p>
              </div>

              <Form onSubmit={handleSubmit(onSubmit)}>
                {(error || errors.root) && (
                  <Alert variant="danger" className="py-2 small">
                    {error?.message || errors.root?.message}
                  </Alert>
                )}

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="small fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@company.com"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label className="small fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                    isInvalid={!!errors.password}
                    disabled={isLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3 py-2 fw-bold" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>

              <div className="text-center mb-3">
                <a href="#" className="text-decoration-none small">Forgot password?</a>
              </div>

              <div className="text-center small">
                Don't have an account? <Link to="/auth/register" className="text-decoration-none fw-bold">Sign Up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;