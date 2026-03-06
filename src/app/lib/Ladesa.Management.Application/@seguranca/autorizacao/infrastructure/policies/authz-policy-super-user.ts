import type { IAuthzPolicySetup } from "../../domain";
import { AUTHZ_ENTITIES, BaseAuthzPolicy } from "./base-authz-policy";

/**
 * Cria configuração para super usuário (acesso total).
 * - Todas operações: permitidas sem restrição
 */
const createSuperUserEntityPermissions = () => ({
  create: true,
  find: true,
  update: true,
  delete: true,
});

/**
 * Política de autorização para super usuário.
 * Permite todas as operações sem restrição.
 */
export class AuthzPolicySuperUser extends BaseAuthzPolicy {
  constructor() {
    const setup: IAuthzPolicySetup = {};

    for (const entity of AUTHZ_ENTITIES) {
      setup[entity] = createSuperUserEntityPermissions();
    }

    super(setup);
  }
}
