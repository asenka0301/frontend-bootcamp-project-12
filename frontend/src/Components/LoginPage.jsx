import {
  React,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import routes from '../routes.js';
import useAuth from '../hooks/index';
import chatLogo from '../Images/chat-logo.svg';

function LoginPage() {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string('Required')
        .min(3, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
      password: Yup.string()
        .min(3, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          auth.logIn();
          navigate('/');
        }
      } catch (errors) {
        formik.setSubmitting(false);
        if (errors.isAxiosError && errors.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw errors;
      }
    },
  });

  if (auth.loggedIn) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <main className="main">
      <div className="loginContainer">
        <div className="imgContainer">
          <img className="img-fluid" src={chatLogo} alt="logo" width="250" height="250" />
        </div>
        <fieldset disabled={formik.isSubmitting}>
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Login</h1>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                id="username"
                name="username"
                placeholder="username"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={authFailed}
                ref={inputRef}
              />
              <Form.Label htmlFor="username">Your username</Form.Label>
            </Form.Group>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={authFailed}
                required
              />
              <Form.Label htmlFor="password">Your password</Form.Label>
              <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="btn-submit">Login</Button>
          </Form>
        </fieldset>
        <footer>
          <span>No account? </span>
          <a href="/signup"> Sign up</a>
        </footer>
      </div>
    </main>
  );
}

export default LoginPage;
