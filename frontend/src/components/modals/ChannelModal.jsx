import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Modal, Button } from 'react-bootstrap';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { useSocket } from '../../hooks/index';

const ChannelModal = (props) => {
  const { handleClose } = props;
  const socket = useSocket();
  const { t } = useTranslation();
  const inputRef = useRef();
  const channels = useSelector(channelsSelectors.selectAll);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      const { name } = values;
      try {
        socket.addChannel(name);
        toast.success(`${t('channelCreated')}`);
        handleClose();
      } catch (errors) {
        console.log(errors);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton={handleClose}>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
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
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>{t('cancelButton')}</Button>
            <Button type="submit" variant="primary">
              {t('sendButton')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ChannelModal;
