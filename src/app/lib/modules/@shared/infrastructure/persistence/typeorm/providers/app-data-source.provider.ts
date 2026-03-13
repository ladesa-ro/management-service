import type { Provider } from "@nestjs/common";
import { join } from "path";
import { DataSource, type DataSourceOptions } from "typeorm";
import { buildDataSourceConnectionOptions } from "@/infrastructure.database/data-sources/helpers/build-data-source-connection-options";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";

export const APP_DATA_SOURCE_TOKEN = Symbol();

export const appDataSourceProvider: Provider = {
  provide: APP_DATA_SOURCE_TOKEN,

  useFactory: async (opts: IDatabaseOptions) => {
    const entitiesPath = join(__dirname, "../../../../../..");

    const dataSource = new DataSource({
      ...buildDataSourceConnectionOptions(opts),
      entities: [`${entitiesPath}/**/*.entity{.ts,.js}`],
    } as DataSourceOptions);

    console.log("[INFO] app data source created.");

    console.log("[INFO] initializing app data source...");

    const initializePromise = dataSource.initialize();

    initializePromise
      .then(() => {
        console.log("[INFO] app data source initialized.");
      })
      .catch(() => {
        console.log("[INFO] app data source can not be initialized.");
      });

    return initializePromise;
  },

  inject: [IDatabaseOptions],
};
