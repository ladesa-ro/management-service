import type { Provider } from "@nestjs/common";
import { CONFIG_PORT } from "@/modules/@shared/application/ports/out/config";
import { EnvironmentConfigAdapter } from "@/server/adapters/config";

/**
 * Provider que conecta o token CONFIG_PORT ao adapter EnvironmentConfigAdapter
 */
export const AppConfigProvider: Provider = {
  provide: CONFIG_PORT,
  useClass: EnvironmentConfigAdapter,
};

/**
 * @deprecated Use CONFIG_PORT instead
 * Mantido para compatibilidade com código legado
 */
export const AppConfigService = CONFIG_PORT;
