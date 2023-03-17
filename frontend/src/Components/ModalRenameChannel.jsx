/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice';

function ModalRenameChannel(props) {
  const { setRenameChannelModal } = props;
  const inputRef = useRef();
  // const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .required('Required field')
        .notOneOf((channels).map((channel) => channel.name), 'Must be unique'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setRenameChannelModal(false);
          }
        }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">Rename channel</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={() => setRenameChannelModal(false)}
              />
            </div>
            <div className="modal-body">
              <Form onSubmit={formik.handleSubmit}>
                <div>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      name="name"
                      id="name"
                      ref={inputRef}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Label htmlFor="name">Channel</Form.Label>
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={() => setRenameChannelModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">Send</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalRenameChannel;
