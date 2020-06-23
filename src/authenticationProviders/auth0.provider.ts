import AppConfig from '@main/config/appConfig';
import AuthenticationProviderInterface from './authenticationProviderInterface';

export default class Auth0Provider implements AuthenticationProviderInterface {
  // eslint-disable-next-line class-methods-use-this
  public async isTokenValid(token: string): Promise<boolean> {
    if (token === AppConfig.authToken) return true;
    return false;
  }
}
