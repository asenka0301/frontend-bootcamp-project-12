import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  const formik = useFormik({
    initialValues: {
      nickname: '',
      password: '',
    },
    validationSchema: Yup.object({
      nickname: Yup.string('Required')
        .min(3, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
      password: Yup.string()
        .min(3, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-sm-3 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Login</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          id="nickname"
          name="nickname"
          type="text"
          className="form-control"
          required
          placeholder="Your nickname"
          autocomplite="nickname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nickname}
        />
        <Form.Label htmlFor="nickname" className="form-label">Your nickname</Form.Label>
        {/* { formik.touched.nickname && formik.errors.nickname ? (
          <div>{ formik.errors.nickname }</div>) : null } */}
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
