import React from 'react';
import { User } from '../models/user';
import { useForm } from 'react-hook-form';
import { SignUp, SignUpCredentials } from '../network/userAPI';
import { Button, Form, Modal } from 'react-bootstrap';

interface Props {
  onDismiss: () => void;
  onSignUpSuccess: (user: User) => void;
}

const SignUpDialog = ({ onDismiss, onSignUpSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await SignUp(credentials);
      onSignUpSuccess(newUser);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="youremail@example.com"
              isInvalid={!!errors.email}
              {...register('email', { required: 'Email is required' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
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
        <Button type="submit" form="signUpForm" disabled={isSubmitting}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpDialog;
