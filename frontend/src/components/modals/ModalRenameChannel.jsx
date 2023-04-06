import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';
import { useSocket } from '../../hooks/index';

const ModalRenameChannel = (props) => {
  const { handleClose } = props;
  const socket = useSocket();
  const inputRef = useRef();
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const id = useSelector((state) => state.modals.id);
  const currentChannelName = channels.find((channel) => channel.id === id).name;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      socket.renameChannel({ id, name: values.name });
      toast.success(`${t('channelRenamed')}`);
      handleClose();
    },
  });

  return (
    <>
      <Modal.Header closeButton={handleClose}>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
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
              onFocus={() => inputRef.current.select()}
              disabled={formik.isSubmitting}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label htmlFor="name">{t('channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleClose}>
              {t('cancelButton')}
            </Button>
            <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('sendButton')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ModalRenameChannel;
