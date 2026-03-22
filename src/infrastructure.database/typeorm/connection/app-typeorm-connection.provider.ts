import { Logger, type Provider } from "@nestjs/common";
import { DataSource, type DataSourceOptions } from "typeorm";
import { DataSourceAppFactory } from "@/infrastructure.database/data-sources/factories/data-source-app-factory";
import { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { IAppTypeormConnection } from "./app-typeorm-connection.interface";
import { AppTypeormConnectionProxy } from "./app-typeorm-connection.proxy";

export const AppTypeormConnectionProvider: Provider = {
  provide: IAppTypeormConnection,

  useFactory: async (opts: IDatabaseOptions) => {
    const dataSource = new DataSource(DataSourceAppFactory.fromOptions(opts) as DataSourceOptions);

    Logger.log("App data source created.", "TypeORM");

    Logger.log("Initializing app data source...", "TypeORM");

    const initializePromise = dataSource.initialize();

    initializePromise
      .then(() => {
        Logger.log("App data source initialized.", "TypeORM");
      })
      .catch(() => {
        Logger.error("App data source can not be initialized.", undefined, "TypeORM");
      });

    const initializedDataSource = await initializePromise;

    return new AppTypeormConnectionProxy(initializedDataSource);
  },

  inject: [IDatabaseOptions],
};
