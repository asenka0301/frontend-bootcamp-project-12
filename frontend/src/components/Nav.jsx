import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index';
import routes from '../routes';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('logOut')}</Button>
      : null
  );
};

const Nav = () => {
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm" bg="white" expand="lg" variant="white">
      <Container>
        <Navbar.Brand as={Link} to={`${routes.root()}`}>
          {t('HexletChat')}
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Nav;
