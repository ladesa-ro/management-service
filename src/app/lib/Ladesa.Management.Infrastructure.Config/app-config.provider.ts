import type { Provider } from "@nestjs/common";
import { CONFIG_PORT } from "@/Ladesa.Management.Application/@shared/application/ports/out/config";
import { EnvironmentConfigAdapter } from "./environment-config.adapter";

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
