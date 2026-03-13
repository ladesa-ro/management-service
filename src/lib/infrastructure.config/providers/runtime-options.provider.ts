import { Provider } from "@nestjs/common";
import type { IRuntimeOptions } from "../options/runtime-options.interface";
import { IRuntimeOptions as IRuntimeOptionsToken } from "../options/runtime-options.interface";
import type { IConfigService } from "../config-service.interface";
import { IConfigService as IConfigServiceToken } from "../config-service.interface";
import pkg from "../../../package.json";
import { EnvKeys } from "../env-keys";

export const RuntimeOptionsProvider: Provider = {
  provide: IRuntimeOptionsToken,
  useFactory: (configService: IConfigService): IRuntimeOptions => {
    const nodeEnv = (configService.get<string>(EnvKeys.NODE_ENV) ?? "production").trim().toLocaleLowerCase();
    const isProduction = nodeEnv === "production";

    const rawPort = configService.get<number | string>(EnvKeys.PORT) ?? null;
    let port = 3471;
    if (rawPort !== null) {
      const parsed = Number.parseInt(String(rawPort));
      if (!Number.isNaN(parsed)) {
        port = parsed;
      }
    }

    const apiPrefix = configService.get<string>(EnvKeys.API_PREFIX);
    const prefix = apiPrefix ? (apiPrefix.endsWith("/") ? apiPrefix : `${apiPrefix}/`) : "/";

    const buildTimeRaw = configService.get<string>(EnvKeys.BUILD_TIME);
    const buildTime = buildTimeRaw ? new Date(buildTimeRaw) : null;

    const gitCommitHash = configService.get<string>(EnvKeys.GIT_COMMIT_HASH) ?? null;

    const swaggerServersRaw = configService.get<string>(EnvKeys.SWAGGER_SERVERS);
    const swaggerServers =
      typeof swaggerServersRaw === "string"
        ? swaggerServersRaw
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean)
        : null;

    const storagePath = configService.get<string>(EnvKeys.STORAGE_PATH);
    if (!storagePath) {
      throw new Error("Please provide env.STORAGE_PATH (e.g. /tmp/uploaded)");
    }

    const envValue = configService.get<string>(EnvKeys.ENABLE_PERMISSION_CHECK);
    const permissionCheckEnabled = isProduction ? envValue !== "false" : envValue === "true";

    return {
      version: configService.get<string>(EnvKeys.LADESA_API_VERSION) ?? pkg.version,
      port,
      nodeEnv,
      prefix,
      buildTime,
      gitCommitHash,
      swaggerServers,
      storagePath,
      permissionCheckEnabled,
    };
  },
  inject: [IConfigServiceToken],
};
