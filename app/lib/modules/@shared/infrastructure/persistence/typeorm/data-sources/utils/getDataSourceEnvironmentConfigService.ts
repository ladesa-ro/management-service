import { NestFactory } from "@nestjs/core";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";
import { DataSourceSetupModule } from "./DataSourceSetupModule";

export const getDataSourceAppConfigService = async (appConfigService: IConfigPort | null) => {
  if (appConfigService === null) {
    const app = await NestFactory.create(DataSourceSetupModule);

    const appConfigService = app.get<IConfigPort>(CONFIG_PORT);

    return appConfigService;
  }

  return appConfigService;
};
