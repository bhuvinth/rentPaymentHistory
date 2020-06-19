export interface IApplicationError {
  message?: string;
  error?: Error;
  code?: string;
  details?: Object;
}

export default class ApplicationError extends Error {
  public static defaultErrorCode = 'APPLICATION_ERROR';

  public code: string;

  public message: string;

  public details: Object;

  constructor(params?: IApplicationError) {
    // eslint-disable-next-line no-param-reassign
    params = params || {};
    const message = ApplicationError.buildErrorMessageFromParams(params);

    super(message);

    this.code = params.code || (this.constructor as typeof ApplicationError).defaultErrorCode;
    this.message = message;
    this.details = params.details || {};
  }

  public static buildErrorMessageFromParams(params: IApplicationError): string {
    const defaultMessage = 'Something went wrong';
    if (params.message) {
      return params.message;
    }
    if (params.error) {
      return params.error.message;
    }
    return defaultMessage;
  }
}
