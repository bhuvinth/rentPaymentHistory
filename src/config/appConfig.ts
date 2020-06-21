/* eslint-disable radix */
import * as dotenvsafe from 'dotenv-safe';

dotenvsafe.config();

export default class AppConfig {
  public static databaseConfiguration = {
    hostName: process.env.DATABASE_HOST_NAME,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
    userName: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_PASSWORD,
    schemaName: process.env.DATABASE_SCHEMA_NAME,
  };

  public static authToken = process.env.AUTH_TOKEN;

  public static serverPort = process.env.PORT;
}
