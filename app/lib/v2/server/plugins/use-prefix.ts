import { INestApplication } from "@nestjs/common";
import { AppConfigService } from "@/v2/infra/config";

export const usePrefix = (app: INestApplication) => {
  const configService = app.get<AppConfigService>(AppConfigService);

  const prefix = configService.getRuntimePrefix();

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ["health"] });
  }
}