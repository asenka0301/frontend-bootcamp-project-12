/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { io } from 'socket.io-client';
import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { actions as channelsAction, selectors as channelsSelectors } from '../slices/channelsSlice';

const socket = io();

const ChannelModal = (props) => {
  const {
    setShowModal,
    setActiveChannelId,
  } = props;
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: Yup.object({
      name: Yup
        .string()
        .required(`${'requiredField'}`)
        .min(3, `${t('usernameLength')}`)
        .max(20, `${t('usernameLength')}`)
        .notOneOf((channels).map((channel) => channel.name), `${t('channelExistsMessage')}`),
    }),
    onSubmit: (values) => {
      const currentUser = JSON.parse(localStorage.getItem('userData')).username;
      socket.emit('newChannel', { name: values.name, username: currentUser }, (response) => {
        if (response.status === 'ok') {
          toast.success(`${t('channelCreated')}`);
          socket.on('newChannel', (payload) => {
            setActiveChannelId(payload.id);
            dispatch(channelsAction.addChannel(payload));
          });
          setShowModal(false);
        } else {
          toast.error(`${t('connectionError')}`);
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
        tabIndex={-1}
        style={{ display: 'block' }}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setShowModal(false);
          }
        }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">{t('addChannel')}</div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
                onClick={() => setShowModal(false)}
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
                    <Form.Label htmlFor="name">{t('channelName')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="invalid-feedback" />
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={() => setShowModal(false)}>{t('cancelButton')}</button>
                    <button type="submit" className="btn btn-primary">
                      {t('sendButton')}
                    </button>
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

export default ChannelModal;
