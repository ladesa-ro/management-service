import { INestApplication } from "@nestjs/common";
import { CONFIG_PORT, type IConfigPort } from "@/core/@shared/application/ports/out/config";

export const usePrefix = (app: INestApplication) => {
  const configService = app.get<IConfigPort>(CONFIG_PORT);

  const prefix = configService.getRuntimePrefix();

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ["health"] });
  }
};
