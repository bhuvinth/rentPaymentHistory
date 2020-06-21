import ApplicationError from '../../../common/applicationError';

export default class DomainError extends ApplicationError {
  public static defaultErrorCode = 'DOMAIN_ERROR';
}
