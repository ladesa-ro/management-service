import { Provider } from "@nestjs/common";
import type { IDatabaseOptions } from "@/infrastructure.database/options/database-options.interface";
import { IDatabaseOptions as IDatabaseOptionsToken } from "@/infrastructure.database/options/database-options.interface";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";

export const DatabaseOptionsProvider: Provider = {
  provide: IDatabaseOptionsToken,
  useFactory: (configService: IConfigService): IDatabaseOptions => ({
    schema: configService.get<string>(ConfigTokens.DatabaseOptions.Schema) ?? "",
    url: configService.get<string>(ConfigTokens.DatabaseOptions.Url) ?? "",
    useSSL: configService.get<string>(ConfigTokens.DatabaseOptions.UseSSL) ?? "true",
  }),
  inject: [IConfigServiceToken],
};
