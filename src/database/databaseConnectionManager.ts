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
        connection = await createConnection(dbConfig);
      }
      return connection;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new DatabaseConnectionManager();
