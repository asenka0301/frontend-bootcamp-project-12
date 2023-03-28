const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
  login: () => '/login',
  signUp: () => '/signup',
  notFoundPage: () => '*',
  root: () => '/',
};
