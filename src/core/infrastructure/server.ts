import 'reflect-metadata';
import 'source-map-support/register';

import { ApolloError, ApolloServer } from 'apollo-server';

import { GraphQLError } from 'graphql';
import Auth0Provider from '@authenticationProviders/auth0.provider';
import createApolloContextProvider from '@graphql/contextHelper';
import createRootSchema from '@graphql/createRootSchema';
import ApplicationError from '@main/common/applicationError';
import DomainError from '@core/domain/domainErrors/domainErrorBase';
import Logger from '@utils/logger';
import AppConfig from '@main/config/appConfig';

export const schema = createRootSchema();
const authenticationProvider = new Auth0Provider();
export const context = async (event: any) =>
  createApolloContextProvider(event, authenticationProvider);

export const server = new ApolloServer({
  schema,
  context: async (event: any) => {
    return context(event);
  },
  formatError: (err: GraphQLError) => {
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
  },
  playground: true,
  introspection: true,
});

server.listen({ port: AppConfig.serverPort }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
