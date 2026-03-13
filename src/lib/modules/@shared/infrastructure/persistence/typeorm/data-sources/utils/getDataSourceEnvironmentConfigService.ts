import { NestFactory } from "@nestjs/core";
import {
  IDatabaseOptions,
  type IDatabaseOptions as IDatabaseOptionsType,
} from "@/infrastructure.database/options/database-options.interface";
import { DataSourceSetupModule } from "./DataSourceSetupModule";

export const getDataSourceAppConfigService = async (
  databaseOptions: IDatabaseOptionsType | null,
): Promise<IDatabaseOptionsType> => {
  if (databaseOptions === null) {
    const app = await NestFactory.create(DataSourceSetupModule);
    return app.get<IDatabaseOptionsType>(IDatabaseOptions);
  }

  return databaseOptions;
};
