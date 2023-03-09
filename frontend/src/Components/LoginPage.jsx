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
import { useNavigate } from 'react-router-dom';
import routes from '../routes.js';
import useAuth from '../hooks/index';
import chatLogo from '../Images/chat-logo.svg';

function LoginPage() {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { authFailed, setAuthFailed } = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
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
  return (
    <main className="main">
      <div className="loginContainer">
        <div className="imgContainer">
          <img className="img-fluid" src={chatLogo} alt="logo" width="250" height="250" />
        </div>
        <fieldset disabled={formik.isSubmitting}>
          <Form onSubmit={formik.handleSubmit} className="col-6 col-md-3 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Login</h1>
            <Form.Group className="form-floating mb-3">
              <Form.Label htmlFor="username">Your username</Form.Label>
              <Form.Control
                id="username"
                name="username"
                placeholder="Your username"
                autocomplite="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={authFailed}
                ref={inputRef}
              />
            </Form.Group>
            <Form.Group className="form-floating mb-3">
              <Form.Label htmlFor="password">Your password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={authFailed}
                required
              />
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
