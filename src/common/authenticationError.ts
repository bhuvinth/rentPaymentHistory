import ApplicationError from './applicationError';

export default class AuthenticationError extends ApplicationError {
  public static defaultErrorCode = 'AUTHENTICATION_ERROR';
}
