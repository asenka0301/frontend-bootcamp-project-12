import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { useSocket } from '../../../../hooks/index';

const MessageForm = () => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const socket = useSocket();
  const activeChannelId = useSelector((state) => {
    const { currentChannelId } = state.currentChannelId;
    return currentChannelId;
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string('').trim().required('Required'),
    }),
    onSubmit: async (values) => {
      const filteredMessage = leoProfanity.clean(values.body);
      const message = {
        body: filteredMessage,
        channelId: activeChannelId,
        userName: JSON.parse(localStorage.getItem('userData')).username,
      };
      console.log(message);
      try {
        await socket.sendMessage(message);
        // eslint-disable-next-line no-param-reassign
        values.body = '';
      } catch (errors) {
        console.log(errors);
      }
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group">
          <Form.Control
            name="body"
            id="body"
            aria-label="Новое сообщение"
            placeholder={t('enterMessage')}
            className="border-0 p-0 ps-2"
            value={formik.values.body}
            onChange={formik.handleChange}
            ref={inputRef}
          />
          <Button type="submit" variant="group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('sendButton')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageForm;
