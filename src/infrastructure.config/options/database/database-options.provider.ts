import { Logger, Provider } from "@nestjs/common";
import type { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { IDatabaseOptions as IDatabaseOptionsToken } from "@/infrastructure.database/options/database-options.interface";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";

export const DatabaseOptionsProvider: Provider = {
  provide: IDatabaseOptionsToken,
  useFactory: (configService: IConfigService): IDatabaseOptions | null => {
    const url = configService.get<string>(ConfigTokens.DatabaseOptions.Url);

    if (!url) {
      Logger.warn(
        "DATABASE_URL not configured. Database features will be unavailable.",
        "AppConfig",
      );
      return null;
    }

    return {
      url,
      schema: configService.get<string>(ConfigTokens.DatabaseOptions.Schema) ?? "",
      useSSL: configService.get<string>(ConfigTokens.DatabaseOptions.UseSSL) ?? "true",
    };
  },
  inject: [IConfigServiceToken],
};
