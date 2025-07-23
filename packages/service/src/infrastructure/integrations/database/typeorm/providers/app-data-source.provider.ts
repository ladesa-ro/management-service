import { AppConfigService } from "@/infrastructure/config";
import type { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";

export const APP_DATA_SOURCE_TOKEN = Symbol();

export const appDataSourceProvider: Provider = {
  provide: APP_DATA_SOURCE_TOKEN,

  useFactory: async (appConfigService: AppConfigService) => {
    const options = appConfigService.getTypeOrmAppDataSourceOptions();

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

  inject: [AppConfigService],
};
