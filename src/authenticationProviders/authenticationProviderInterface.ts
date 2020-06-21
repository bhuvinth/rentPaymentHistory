export default interface AuthenticationProviderInterface {
  isTokenValid(token: string): Promise<boolean>;
}
