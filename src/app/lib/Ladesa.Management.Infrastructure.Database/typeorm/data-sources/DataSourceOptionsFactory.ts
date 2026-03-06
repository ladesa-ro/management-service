import { join } from "path";
import type { DataSourceOptions } from "typeorm";
import type { IConfigInfrastructureDatabase } from "../../Config/IConfigInfrastructureDatabase";
import * as entities from "../../TypeOrmNew/Entities";

export class DataSourceOptionsFactory {
  constructor(private readonly config: IConfigInfrastructureDatabase) {}

  getSharedDataSourceOptions(): Partial<DataSourceOptions> {
    const sharedEnvConfig: Partial<DataSourceOptions> = {};

    const DB_CONNECTION = this.config.getDbConnection();

    if (DB_CONNECTION !== undefined) {
      const DB_SCHEMA = this.config.getDbSchema();

      const TYPEORM_LOGGING = this.config.getDbLogging();

      const DATABASE_URL = this.config.getDbUrl();
      const DATABASE_USE_SSL = this.config.getDbUseSSL();

      Object.assign(sharedEnvConfig, {
        type: DB_CONNECTION,

        url: DATABASE_URL,
        schema: DB_SCHEMA,

        synchronize: false,

        logging: TYPEORM_LOGGING,
      } as Partial<DataSourceOptions>);

      if (DATABASE_USE_SSL !== "false") {
        Object.assign(sharedEnvConfig, {
          options: {
            validateConnection: false,
            trustServerCertificate: true,
          },

          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
        });
      }
    }

    return sharedEnvConfig;
  }

  getAppDataSourceOptions(): DataSourceOptions {
    const options = {
      ...this.getSharedDataSourceOptions(),
      entities: [...Object.values(entities)],
    };

    return options as DataSourceOptions;
  }

  getMigrationDataSourceOptions(): DataSourceOptions {
    const migrationsPath = join(__dirname, "../../TypeOrmNew/Migrations");

    const options = {
      ...this.getSharedDataSourceOptions(),
      migrations: [`${migrationsPath}/*{.ts,.js}`],
      migrationsTableName: "app_migration_db",
    };

    return options as DataSourceOptions;
  }
}
