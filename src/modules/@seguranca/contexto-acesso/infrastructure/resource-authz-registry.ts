import { Injectable } from "@nestjs/common";
import type { DataSource, SelectQueryBuilder } from "typeorm";

/**
 * Configuração de um recurso de autorização.
 */
export interface IResourceAuthzConfig {
  /**
   * Alias padrão usado no query builder.
   */
  alias: string;

  /**
   * Função que retorna o query builder para o recurso.
   */
  getQueryBuilder: (dataSource: DataSource) => SelectQueryBuilder<any>;
}

/**
 * Registro de ações para um recurso.
 * Ex: { find: true, update: true, delete: true }
 */
export type ResourceActions = Record<string, boolean>;

/**
 * Registro completo de um recurso.
 */
export interface IResourceRegistration {
  config: IResourceAuthzConfig;
  actions: ResourceActions;
}

/**
 * Registry para configurações de autorização de recursos.
 * Substitui o switch case hardcoded no AccessContext.
 *
 * Uso:
 * ```typescript
 * // No módulo do recurso
 * resourceRegistry.register("estado", {
 *   alias: "estado",
 *   getQueryBuilder: (ds) => createEstadoRepository(ds).createQueryBuilder("estado"),
 * }, { find: true });
 * ```
 */
@Injectable()
export class ResourceAuthzRegistry {
  private readonly resources = new Map<string, IResourceRegistration>();

  /**
   * Registra um recurso e suas ações suportadas.
   */
  register(resourceName: string, config: IResourceAuthzConfig, actions: ResourceActions): void {
    this.resources.set(resourceName, { config, actions });
  }

  /**
   * Obtém a configuração de um recurso.
   */
  getConfig(resourceName: string): IResourceAuthzConfig | null {
    return this.resources.get(resourceName)?.config ?? null;
  }

  /**
   * Verifica se uma ação é suportada para um recurso.
   */
  hasAction(resourceName: string, action: string): boolean {
    const registration = this.resources.get(resourceName);
    return registration?.actions[action] ?? false;
  }

  /**
   * Obtém o query builder para uma ação.
   * Formato da action: "recurso:acao" (ex: "estado:find")
   */
  getQueryBuilderForAction(action: string, dataSource: DataSource): SelectQueryBuilder<any> | null {
    const [resourceName, actionName] = action.split(":");

    if (!resourceName || !actionName) {
      return null;
    }

    const registration = this.resources.get(resourceName);

    if (!registration || !registration.actions[actionName]) {
      return null;
    }

    return registration.config.getQueryBuilder(dataSource);
  }

  /**
   * Lista todos os recursos registrados.
   */
  listResources(): string[] {
    return Array.from(this.resources.keys());
  }

  /**
   * Lista todas as ações suportadas por um recurso.
   */
  listActions(resourceName: string): string[] {
    const registration = this.resources.get(resourceName);
    if (!registration) return [];
    return Object.keys(registration.actions).filter((a) => registration.actions[a]);
  }
}

/**
 * Token para injeção do registry.
 */
export const RESOURCE_AUTHZ_REGISTRY = Symbol("ResourceAuthzRegistry");
