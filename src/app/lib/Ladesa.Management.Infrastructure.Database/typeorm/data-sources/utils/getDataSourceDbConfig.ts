import { NestFactory } from "@nestjs/core";
import {
  CONFIG_INFRASTRUCTURE_DATABASE,
  type IConfigInfrastructureDatabase,
} from "../../../Config/IConfigInfrastructureDatabase";
import { DataSourceSetupModule } from "./DataSourceSetupModule";

export const getDataSourceDbConfig = async (
  config: IConfigInfrastructureDatabase | null,
): Promise<IConfigInfrastructureDatabase> => {
  if (config === null) {
    const app = await NestFactory.create(DataSourceSetupModule);

    const resolved = app.get<IConfigInfrastructureDatabase>(CONFIG_INFRASTRUCTURE_DATABASE);

    return resolved;
  }

  return config;
};
