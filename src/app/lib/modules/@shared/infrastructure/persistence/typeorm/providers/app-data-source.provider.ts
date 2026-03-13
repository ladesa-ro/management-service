import type { Provider } from "@nestjs/common";
import { DataSource, type DataSourceOptions } from "typeorm";
import { DataSourceAppFactory } from "@/infrastructure.database/data-sources/factories/data-source-app-factory";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";

export const APP_DATA_SOURCE_TOKEN = Symbol();

export const appDataSourceProvider: Provider = {
  provide: APP_DATA_SOURCE_TOKEN,

  useFactory: async (opts: IDatabaseOptions) => {
    const dataSource = new DataSource(DataSourceAppFactory.fromOptions(opts) as DataSourceOptions);

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
