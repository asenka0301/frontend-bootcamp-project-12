import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import routes from '../routes.js';
import useAuth from '../hooks/index';
import chatLogo from '../Images/chat-logo.svg';

function SignUpPage() {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isUserExists, setIsUserExists] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string('')
        .min(3, `${t('usernameLength')}`)
        .max(20, `${t('usernameLength')}`)
        .required(`${t('requiredField')}`),
      password: Yup.string()
        .min(3, `${t('passwordLength')}`)
        .required(`${t('requiredField')}`),
      passwordConfirmation: Yup.string()
        .required(`${t('requiredField')}`)
        .oneOf(
          [Yup.ref('password'), null],
          `${t('passwordConfirmationMessage')}`,
        ),
    }),
    onSubmit: async (values) => {
      setIsUserExists(false);
      try {
        const response = await axios
          .post(routes.signUpPath(), { username: values.username, password: values.password });
        console.log(response.status);
        if (response.status === 201) {
          localStorage.setItem('userData', JSON.stringify(response.data));
          auth.logIn();
          navigate('/');
        }
      } catch (errors) {
        formik.setSubmitting(false);
        if (errors.isAxiosError && errors.response.status === 401) {
          inputRef.current.select();
          return;
        }
        if (errors.isAxiosError && errors.response.status === 409) {
          inputRef.current.select();
          setIsUserExists(true);
        }
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
            <h1 className="text-center mb-4">{t('signUp')}</h1>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                id="username"
                name="username"
                placeholder="username"
                autoComplete="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={isUserExists
                  || (formik.touched.username && formik.errors.username)}
                ref={inputRef}
              />
              <Form.Label htmlFor="username">{t('username')}</Form.Label>
              <Form.Control.Feedback type="invalid">{isUserExists ? ' ' : formik.errors.username}</Form.Control.Feedback>
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
                isInvalid={isUserExists
                  || (formik.touched.password && formik.errors.password)}
              />
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
              <Form.Control.Feedback type="invalid">{isUserExists ? '' : formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-floating mb-3">
              <Form.Control
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="passwordConfirmation"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
                isInvalid={isUserExists
                  || (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)}
              />
              <Form.Label htmlFor="passwordConfirmation">{t('passwordConfirmation')}</Form.Label>
              <Form.Control.Feedback type="invalid">{isUserExists ? `${t('userExistsMessage')}` : formik.errors.passwordConfirmation}</Form.Control.Feedback>
            </Form.Group>
            <button type="submit" className="btn-submit">{t('signUp')}</button>
          </Form>
        </fieldset>
      </div>
    </main>
  );
}

export default SignUpPage;
