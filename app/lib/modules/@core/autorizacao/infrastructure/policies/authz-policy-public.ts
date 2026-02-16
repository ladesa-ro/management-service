import type { IAuthzPolicySetup, IBaseAuthzFilterFn } from "../../domain";
import { AUTHZ_ENTITIES, BaseAuthzPolicy } from "./base-authz-policy";

/**
 * Filtro que permite apenas registros não deletados (soft delete).
 */
export const filterAllowNotDeleted: IBaseAuthzFilterFn<any, any> = (_context, alias = "row") => {
  return (qb) => {
    qb.andWhere(`${alias}.dateDeleted IS NULL`);
  };
};

/**
 * Cria configuração padrão para entidades públicas.
 * - create: permitido
 * - find/update/delete: filtrado por soft delete
 */
const createPublicEntityPermissions = () => ({
  create: true,
  find: filterAllowNotDeleted,
  update: filterAllowNotDeleted,
  delete: filterAllowNotDeleted,
});

/**
 * Cria configuração para entidades somente leitura COM soft delete.
 * - create: não permitido
 * - find: filtrado por soft delete
 * - update/delete: não permitido
 */
const _createReadOnlyEntityPermissions = () => ({
  find: filterAllowNotDeleted,
});

/**
 * Cria configuração para entidades somente leitura SEM soft delete.
 * Usada para entidades de referência (ex: estado, cidade do IBGE).
 * - create: não permitido
 * - find: permitido (sem filtro)
 * - update/delete: não permitido
 */
const createReadOnlyNoSoftDeletePermissions = () => ({
  find: true,
});

/**
 * Política de autorização pública (padrão).
 * Permite operações CRUD com filtro de soft delete.
 */
export class AuthzPolicyPublic extends BaseAuthzPolicy {
  constructor() {
    const setup: IAuthzPolicySetup = {};

    // Entidades de referência sem soft delete (dados IBGE, etc)
    const noSoftDeleteEntities = ["estado", "cidade"];

    for (const entity of AUTHZ_ENTITIES) {
      if (noSoftDeleteEntities.includes(entity)) {
        setup[entity] = createReadOnlyNoSoftDeletePermissions();
      } else {
        setup[entity] = createPublicEntityPermissions();
      }
    }

    super(setup);
  }
}
