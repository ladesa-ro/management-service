import { INestApplication } from "@nestjs/common";
import { IRuntimeOptions, IRuntimeOptions as IRuntimeOptionsToken } from "@/infrastructure.config/options/runtime-options.interface";

export const usePrefix = (app: INestApplication) => {
  const runtimeOptions = app.get<IRuntimeOptions>(IRuntimeOptionsToken);

  const prefix = runtimeOptions.prefix;

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ["health"] });
  }
};
