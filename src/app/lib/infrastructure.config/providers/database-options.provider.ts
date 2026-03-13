import { Provider } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import type { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { IDatabaseOptions as IDatabaseOptionsToken } from "@/infrastructure.database/options/database-options.interface";

export const DatabaseOptionsProvider: Provider = {
  provide: IDatabaseOptionsToken,
  useFactory: (configService: NestConfigService): IDatabaseOptions => ({
    schema: configService.get<string>("DB_SCHEMA") ?? "",
    url: configService.get<string>("DATABASE_URL") ?? "",
    useSSL: configService.get<string>("DATABASE_USE_SSL") ?? "true",
  }),
  inject: [NestConfigService],
};
