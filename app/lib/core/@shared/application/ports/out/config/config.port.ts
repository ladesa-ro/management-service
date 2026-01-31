import type { IConfigAuthPort } from "./config-auth.port";
import type { IConfigDatabasePort } from "./config-database.port";
import type { IConfigRuntimePort } from "./config-runtime.port";
import type { IConfigTypeOrmPort } from "./config-typeorm.port";

/**
 * Port unificado de configuração
 * Combina todas as configurações da aplicação
 */
export interface IConfigPort
  extends IConfigRuntimePort,
    IConfigDatabasePort,
    IConfigTypeOrmPort,
    IConfigAuthPort {}

/**
 * Token para injeção de dependência
 */
export const CONFIG_PORT = Symbol.for("CONFIG_PORT");
