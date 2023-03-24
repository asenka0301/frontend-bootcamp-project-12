import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice';
import ModalHedaer from './ModalHeader';

const socket = io();

const ModalRenameChannel = (props) => {
  const { setRenameChannelModal, clickedDropdown, renameChannelModal } = props;
  const inputRef = useRef();
  const renameModalRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelName = clickedDropdown.name;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (renameModalRef.current
        && renameChannelModal && !renameModalRef.current.contains(event.target)) {
        setRenameChannelModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [renameChannelModal, setRenameChannelModal]);

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
            toast.success(`${t('channelRenamed')}`);
            dispatch(channelsActions
              .updateChannel({ id: payload.id, changes: { name: payload.name } }));
          });
          setRenameChannelModal(false);
        } else {
          toast.error(`${t('connectionError')}`);
        }
      });
    },
  });

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" ref={renameModalRef}>
            <ModalHedaer onClick={() => setRenameChannelModal(false)} type="renameChannel" />
            <div className="modal-body">
              <Form onSubmit={formik.handleSubmit} disabled={!formik.isValid}>
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
                    <Form.Label htmlFor="name">{t('channelName')}</Form.Label>
                    <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={() => setRenameChannelModal(false)}>
                      {t('cancelButton')}
                    </Button>
                    <Button type="submit" variant="primary">{t('sendButton')}</Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalRenameChannel;
