import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../../routes.js';
import { useAuth } from '../../hooks/index';
import Img from '../Img';

const LoginPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string('')
        .min(3, `${t('usernameLength')}`)
        .max(20, `${t('usernameLength')}`)
        .required(`${t('requiredField')}`),
      password: Yup.string()
        .min(3, `${t('usernameLength')}`)
        .max(20, `${t('usernameLength')}`)
        .required(`${t('requiredField')}`),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        if (response.status === 200) {
          localStorage.setItem('userData', JSON.stringify(response.data));
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
    return <Navigate to={`${routes.root()}`} />;
  }

  return (
    <main className="main">
      <div className="loginContainer">
        <Img />
        <fieldset disabled={formik.isSubmitting}>
          <Form onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">{t('logIn')}</h1>
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
                autoFocus
              />
              <Form.Label htmlFor="username">{t('nickname')}</Form.Label>
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
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
              <Form.Control.Feedback type="invalid">{t('logInFailed')}</Form.Control.Feedback>
            </Form.Group>
            <button type="submit" className="btn-submit">{t('logIn')}</button>
          </Form>
        </fieldset>
        <footer>
          <span>{t('noAccount')}</span>
          <a href={`${routes.signUp()}`}>{t('signUp')}</a>
        </footer>
      </div>
    </main>
  );
};

export default LoginPage;
