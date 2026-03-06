import type { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import {
  CONFIG_INFRASTRUCTURE_DATABASE,
  type IConfigInfrastructureDatabase,
} from "../../Config/IConfigInfrastructureDatabase";
import { DataSourceOptionsFactory } from "../data-sources/DataSourceOptionsFactory";

export const APP_DATA_SOURCE_TOKEN = Symbol();

export const appDataSourceProvider: Provider = {
  provide: APP_DATA_SOURCE_TOKEN,

  useFactory: async (config: IConfigInfrastructureDatabase) => {
    const factory = new DataSourceOptionsFactory(config);
    const options = factory.getAppDataSourceOptions();

    const dataSource = new DataSource(options);

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

  inject: [CONFIG_INFRASTRUCTURE_DATABASE],
};
