import { ConnectionOptions } from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import RentPaymentHistoryEntity from '../core/infrastructure/database/rentPaymentHistoryEntity';
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
    logging: false,
    entities: [RentPaymentHistoryEntity],
    cli: {
      migrationsDir: './src/database/migrations',
    },
    namingStrategy: new SnakeNamingStrategy(),
  };
};
