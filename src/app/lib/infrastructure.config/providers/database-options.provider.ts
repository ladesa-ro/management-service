import { Provider } from "@nestjs/common";
import type { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { IDatabaseOptions as IDatabaseOptionsToken } from "@/infrastructure.database/options/database-options.interface";
import type { IConfigService } from "../config-service.interface";
import { IConfigService as IConfigServiceToken } from "../config-service.interface";
import { EnvKeys } from "../env-keys";

export const DatabaseOptionsProvider: Provider = {
  provide: IDatabaseOptionsToken,
  useFactory: (configService: IConfigService): IDatabaseOptions => ({
    schema: configService.get<string>(EnvKeys.DB_SCHEMA) ?? "",
    url: configService.get<string>(EnvKeys.DATABASE_URL) ?? "",
    useSSL: configService.get<string>(EnvKeys.DATABASE_USE_SSL) ?? "true",
  }),
  inject: [IConfigServiceToken],
};
