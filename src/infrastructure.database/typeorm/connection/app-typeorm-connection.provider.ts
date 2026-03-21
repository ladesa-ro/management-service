import type { Provider } from "@nestjs/common";
import { DataSource, type DataSourceOptions } from "typeorm";
import { DataSourceAppFactory } from "@/infrastructure.database/data-sources/factories/data-source-app-factory";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { IAppTypeormConnection } from "./app-typeorm-connection.interface";
import { AppTypeormConnectionProxy } from "./app-typeorm-connection.proxy";

export const AppTypeormConnectionProvider: Provider = {
  provide: IAppTypeormConnection,

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

    const initializedDataSource = await initializePromise;

    return new AppTypeormConnectionProxy(initializedDataSource);
  },

  inject: [IDatabaseOptions],
};
