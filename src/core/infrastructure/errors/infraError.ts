import ApplicationError from '@main/common/applicationError';

export default class InfraError extends ApplicationError {
  public static defaultErrorCode = 'INFRASTRUCTURE_ERROR';
}
