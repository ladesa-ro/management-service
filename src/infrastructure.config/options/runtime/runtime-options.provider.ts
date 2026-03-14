import { Provider } from "@nestjs/common";
import pkg from "../../../package.json";
import type { IConfigService } from "../../config-service/config-service.interface";
import { IConfigService as IConfigServiceToken } from "../../config-service/config-service.interface";
import { ConfigTokens } from "../../config-tokens";
import type { IRuntimeOptions } from "./runtime-options.interface";
import { IRuntimeOptions as IRuntimeOptionsToken } from "./runtime-options.interface";

export const RuntimeOptionsProvider: Provider = {
  provide: IRuntimeOptionsToken,
  useFactory: (configService: IConfigService): IRuntimeOptions => {
    const nodeEnv = (configService.get<string>(ConfigTokens.RuntimeOptions.NodeEnv) ?? "production")
      .trim()
      .toLocaleLowerCase();

    const rawPort = configService.get<number | string>(ConfigTokens.RuntimeOptions.Port) ?? null;
    let port = 3471;
    if (rawPort !== null) {
      const parsed = Number.parseInt(String(rawPort));
      if (!Number.isNaN(parsed)) {
        port = parsed;
      }
    }

    const apiPrefix = configService.get<string>(ConfigTokens.RuntimeOptions.ApiPrefix);
    const prefix = apiPrefix ? (apiPrefix.endsWith("/") ? apiPrefix : `${apiPrefix}/`) : "/";

    const buildTimeRaw = configService.get<string>(ConfigTokens.RuntimeOptions.BuildTime);
    const buildTime = buildTimeRaw ? new Date(buildTimeRaw) : null;

    const gitCommitHash =
      configService.get<string>(ConfigTokens.RuntimeOptions.GitCommitHash) ?? null;

    const swaggerServersRaw = configService.get<string>(ConfigTokens.RuntimeOptions.SwaggerServers);
    const swaggerServers =
      typeof swaggerServersRaw === "string"
        ? swaggerServersRaw
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : null;

    const storagePath = configService.get<string>(ConfigTokens.RuntimeOptions.StoragePath);
    if (!storagePath) {
      throw new Error("Please provide env.STORAGE_PATH (e.g. /tmp/uploaded)");
    }

    return {
      version: configService.get<string>(ConfigTokens.RuntimeOptions.ApiVersion) ?? pkg.version,
      port,
      nodeEnv,
      prefix,
      buildTime,
      gitCommitHash,
      swaggerServers,
      storagePath,
    };
  },
  inject: [IConfigServiceToken],
};
