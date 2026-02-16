import { Injectable, type OnModuleInit, type Type } from "@nestjs/common";
import type { ObjectLiteral, Repository } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import { type ResourceActions, ResourceAuthzRegistry } from "./resource-authz-registry";

/**
 * Factory que cria um provider de AuthzRegistry para um recurso.
 *
 * Elimina a necessidade de criar uma classe boilerplate por módulo.
 *
 * @param resourceName - Nome do recurso (ex: "campus", "vinculo")
 * @param getRepository - Função que obtém o repositório a partir do DatabaseContextService
 * @param options - Opções opcionais: alias (default: resourceName), actions (default: find+update+delete)
 *
 * @example
 * ```typescript
 * // No módulo NestJS:
 * providers: [
 *   createAuthzRegistryProvider("campus", (db) => db.campusRepository),
 * ]
 *
 * // Read-only:
 * providers: [
 *   createAuthzRegistryProvider("estado", (db) => db.estadoRepository, {
 *     actions: { find: true },
 *   }),
 * ]
 *
 * // Alias diferente do resource name:
 * providers: [
 *   createAuthzRegistryProvider("vinculo", (db) => db.perfilRepository),
 * ]
 * ```
 */
export function createAuthzRegistryProvider(
  resourceName: string,
  getRepository: (db: DatabaseContextService) => Repository<ObjectLiteral>,
  options?: {
    alias?: string;
    actions?: ResourceActions;
  },
): Type<OnModuleInit> {
  const alias = options?.alias ?? resourceName;
  const actions = options?.actions ?? { find: true, update: true, delete: true };

  @Injectable()
  class AuthzRegistrySetup implements OnModuleInit {
    constructor(
      private readonly registry: ResourceAuthzRegistry,
      private readonly databaseContext: DatabaseContextService,
    ) {}

    onModuleInit() {
      this.registry.register(
        resourceName,
        {
          alias,
          getQueryBuilder: () => getRepository(this.databaseContext).createQueryBuilder(alias),
        },
        actions,
      );
    }
  }

  Object.defineProperty(AuthzRegistrySetup, "name", {
    value: `${resourceName.charAt(0).toUpperCase() + resourceName.slice(1).replace(/_([a-z])/g, (_, c) => c.toUpperCase())}AuthzRegistrySetup`,
  });

  return AuthzRegistrySetup;
}
