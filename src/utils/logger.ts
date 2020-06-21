export default class Logger {
  public static info(info: any) {
    console.info(info);
  }

  public static debug(message: any) {
    console.debug(message);
  }

  public static error(err: any) {
    console.error(err);
  }

  public static warning(warning: any) {
    console.warn(warning);
  }
}
