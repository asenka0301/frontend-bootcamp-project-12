/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { io } from 'socket.io-client';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice';

const socket = io();

function ModalRenameChannel(props) {
  const { setRenameChannelModal, clickedDropdown } = props;
  const inputRef = useRef();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelName = clickedDropdown.name;

  const formik = useFormik({
    initialValues: {
      name: `${currentChannelName}`,
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .required('Required field')
        .min(3, 'From 3 to 20 characters')
        .max(20, 'From 3 to 20 characters')
        .notOneOf((channels).map((channel) => channel.name), 'Must be unique'),
    }),
    onSubmit: (values) => {
      socket.emit('renameChannel', { id: clickedDropdown.id, name: values.name }, (response) => {
        if (response.status === 'ok') {
          socket.on('renameChannel', (payload) => {
            dispatch(channelsActions
              .updateChannel({ id: payload.id, changes: { name: payload.name } }));
          });
          setRenameChannelModal(false);
        }
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
                      onFocus={() => inputRef.current.select()}
                      isInvalid={formik.touched.name && formik.errors.name}
                    />
                    <Form.Label htmlFor="name">Channel</Form.Label>
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={() => setRenameChannelModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">Send</Button>
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
