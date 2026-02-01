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
 * Cria configuração para entidades somente leitura.
 * - create: não permitido
 * - find: filtrado por soft delete
 * - update/delete: não permitido
 */
const createReadOnlyEntityPermissions = () => ({
  find: filterAllowNotDeleted,
});

/**
 * Política de autorização pública (padrão).
 * Permite operações CRUD com filtro de soft delete.
 */
export class AuthzPolicyPublic extends BaseAuthzPolicy {
  constructor() {
    const setup: IAuthzPolicySetup = {};

    // Entidades somente leitura
    const readOnlyEntities = ["estado", "cidade"];

    for (const entity of AUTHZ_ENTITIES) {
      if (readOnlyEntities.includes(entity)) {
        setup[entity] = createReadOnlyEntityPermissions();
      } else {
        setup[entity] = createPublicEntityPermissions();
      }
    }

    super(setup);
  }
}
