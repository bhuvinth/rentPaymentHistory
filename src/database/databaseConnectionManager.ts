import { Connection, ConnectionManager, createConnection, getConnectionManager } from 'typeorm';
import config from './ormconfig';

class DatabaseConnectionManager {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(
    connectionName: string = 'default',
    databaseName?: string,
  ): Promise<Connection> {
    try {
      let connection: Connection;
      if (this.connectionManager.has(connectionName)) {
        connection = this.connectionManager.get(connectionName);
        if (!connection.isConnected) {
          connection = await connection.connect();
        }
      } else {
        const dbConfig: any = config();
        if (databaseName) {
          dbConfig.database = databaseName;
        }
        connection = await this.connectToDatabaseWithRetries(dbConfig);
      }
      return connection;
    } catch (err) {
      throw new Error(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async connectToDatabaseWithRetries(dbConfig: any) {
    let connection: Connection;
    let retries = 5;
    while (retries > 0) {
      try {
        // eslint-disable-next-line no-await-in-loop
        connection = await createConnection(dbConfig);
        return connection;
      } catch (error) {
        retries -= 1;
        console.log(`Database connection error occured: ${error}`, `Retries left: ${retries}`);
        // eslint-disable-next-line no-await-in-loop
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    throw new Error('Cannot connect to the Database');
  }
}

export default new DatabaseConnectionManager();
