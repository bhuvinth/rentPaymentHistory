import { ConnectionOptions } from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import RentPaymentHistoryDTO from '../core/infrastructure/database/rentPaymentHistoryDTO';
import * as migrations from './migrations/1592700426993-createRentPaymentHistoryTable';
import appConfig from '../config/appConfig';

export default (): ConnectionOptions => {
  return {
    name: 'default',
    type: 'postgres',
    host: appConfig.databaseConfiguration.hostName,
    port: appConfig.databaseConfiguration.port,
    username: appConfig.databaseConfiguration.userName,
    password: appConfig.databaseConfiguration.password,
    database: appConfig.databaseConfiguration.schemaName,
    synchronize: true,
    logging: true,
    entities: [RentPaymentHistoryDTO],
    migrations: Object.values(migrations),
    cli: {
      migrationsDir: './src/database/migrations',
    },
    namingStrategy: new SnakeNamingStrategy(),
  };
};
