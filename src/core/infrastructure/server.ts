import 'reflect-metadata';
import 'source-map-support/register';

import { ApolloServer } from 'apollo-server';
import Auth0Provider from '@authenticationProviders/auth0.provider';
import createApolloContextProvider from '@graphql/contextHelper';
import createRootSchema from '@graphql/createRootSchema';
import AppConfig from '@main/config/appConfig';
import formatGraphQLErrors from './graphQL/graphQLErrorHelper';

export const schema = createRootSchema();
const authenticationProvider = new Auth0Provider();
export const context = async (event: any) =>
  createApolloContextProvider(event, authenticationProvider);

export const server = new ApolloServer({
  schema,
  context: async (event: any) => {
    return context(event);
  },
  formatError: formatGraphQLErrors,
  playground: true,
  introspection: true,
});

server.listen({ port: AppConfig.serverPort }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
