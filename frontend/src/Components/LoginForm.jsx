import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import routes from '../routes.js';

function LoginForm() {
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
      try {
        const res = await axios.post(routes.loginPath(), values);
        const user = res.data;
        console.log(user);
        localStorage.setItem(user.username, JSON.stringify(user.token));
      } catch (errors) {
        console.log(errors);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="col-6 col-md-3 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Login</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="username"
          name="username"
          type="text"
          className="form-control"
          required
          placeholder="Your username"
          autocomplite="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <Form.Label htmlFor="username" className="form-label">Your username</Form.Label>
        {/* { formik.touched.username && formik.errors.username ? (
          <div>{ formik.errors.username }</div>) : null } */}
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="password"
          name="password"
          type="password"
          className="form-control"
          required
          placeholder="Your password"
          autocomplite="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <Form.Label htmlFor="password" className="form-label">Your password</Form.Label>
        {/* { formik.touched.password && formik.errors.password ? (
          <div>{ formikLoginPage.errors.password }</div>) : null} */}
      </Form.Group>
      <button type="submit" className="btn-submit">Login</button>
    </Form>
  );
}

export default LoginForm;
