/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthenticationProviderInterface from './authenticationProviderInterface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class Auth0Provider implements AuthenticationProviderInterface {
  // eslint-disable-next-line class-methods-use-this
  public async isTokenValid(token: string): Promise<boolean> {
    return true;
  }
}
