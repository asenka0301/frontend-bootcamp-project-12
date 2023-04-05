import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="container h-100 w-50 d-flex flex-column justify-content-center align-items-center bg-white">
      <h1 className="h1">{t('NotFoundError')}</h1>
      <p className="text-center">{t('NotFoundErrorMessage')}</p>
    </div>
  );
};

export default NotFound;
