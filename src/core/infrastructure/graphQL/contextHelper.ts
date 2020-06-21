import Auth0Provider from '../../../authenticationProviders/auth0.provider';
import Logger from '../../../utils/logger';
import databaseConnectionManager from '../../../database/databaseConnectionManager';
import AuthenticationProviderInterface from '../../../authenticationProviders/authenticationProviderInterface';

export type ServiceResolverContext = {
  isAuthenticated: boolean;
  contextCreationError: string;
};

export const validateContext = (ctx: ServiceResolverContext) => {
  console.log(ctx);
  if (ctx.contextCreationError) {
    throw new Error(ctx.contextCreationError);
  }
  if (!ctx.isAuthenticated) {
    throw new Error('Authentication Error');
  }
};

/**
 * Returns a function that creates an Apollo context.
 *
 * @see {@link https://www.apollographql.com/docs/guides/access-control.html#schema-auth | Schema authorization}
 */
export default async function createApolloContextProvider(
  httpPayload: any,
  authenticationProvider: AuthenticationProviderInterface = new Auth0Provider(),
): Promise<ServiceResolverContext> {
  const event = httpPayload.req;
  let isAuthenticated: boolean = false;
  let contextCreationError = '';
  let token;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await databaseConnectionManager.getConnection();

    token = event.headers.authorization || event.headers.Authorization;
    const isTokenValidated = await authenticationProvider.isTokenValid(token);
    if (!token || !isTokenValidated) {
      throw new Error('coonectionError');
    }
    isAuthenticated = true;
  } catch (err) {
    Logger.error(`context creation failed with error: ${err.message}`);
    isAuthenticated = false;
    contextCreationError = err.message || err;
  }
  return {
    isAuthenticated,
    contextCreationError,
  };
}
