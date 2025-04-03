import React from 'react';
import { User } from '../models/user';
import { useForm } from 'react-hook-form';
import { login, LoginCredentials } from '../network/userAPI';
import { Button, Form, Modal } from 'react-bootstrap';

interface Props {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginDialog = ({ onDismiss, onLoginSuccessful }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="LoginForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="@username"
              isInvalid={!!errors.username}
              {...register('username', { required: 'Username is required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="******"
              isInvalid={!!errors.password}
              {...register('password', { required: 'Password is required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="LoginForm" disabled={isSubmitting}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginDialog;
