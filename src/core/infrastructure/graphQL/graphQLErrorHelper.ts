import { GraphQLError } from 'graphql';
import ApplicationError from '@main/common/applicationError';
import DomainError from '@main/core/domain/domainErrors/domainErrorBase';
import Logger from '@main/utils/logger';
import { ApolloError } from 'apollo-server';

export default function formatGraphQLErrors(err: GraphQLError) {
  const { originalError } = err;
  const formattedError: GraphQLError = Object.assign({}, err);

  if (originalError instanceof ApplicationError || originalError instanceof DomainError) {
    const parentError = Object.getPrototypeOf(originalError.constructor);

    Logger.error({
      message: originalError.message,
      code: originalError.code,
      parent: parentError.CODE,
      details: originalError.details,
    });

    return new ApolloError(originalError.message, parentError.CODE, err.extensions);
  }

  if (!formattedError.extensions) {
    Logger.error(formattedError);
    return formattedError;
  }

  if (!formattedError.extensions.exception) {
    formattedError.extensions.exception = {
      code: formattedError.extensions.code,
    };
  }

  Logger.error({
    message: formattedError.message,
    code: formattedError.extensions.exception.code,
  });

  return formattedError;
}
