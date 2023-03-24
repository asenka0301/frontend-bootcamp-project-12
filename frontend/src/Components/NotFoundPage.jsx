import React from 'react';

const NotFound = () => (
  <div className="container h-100 w-50 d-flex flex-column justify-content-center align-items-center bg-white">
    <h1 className="h1">Ошибка 404</h1>
    <p className="text-center">
      Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует.
      Возможно она устарела, была удалена или неверный адрес в адресной строке.
    </p>
  </div>
);

export default NotFound;
