import { NestFactory } from "@nestjs/core";
import { AppConfigService } from "@/infrastructure-antigo/config";
import { DataSourceModule } from "./data-source.module";

export const getDataSourceAppConfigService = async (appConfigService: AppConfigService | null) => {
  if (appConfigService === null) {
    const app = await NestFactory.create(DataSourceModule);

    const appConfigService = app.get(AppConfigService);

    return appConfigService;
  }

  return appConfigService;
};
