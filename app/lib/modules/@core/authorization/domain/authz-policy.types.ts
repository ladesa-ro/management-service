import type {
  IAuthzStatement,
  IBaseAuthzCheckFn,
  IBaseAuthzFilterFn,
} from "./authz-statement.types";

/**
 * Interface para política de autorização.
 */
export interface IAuthzPolicy {
  readonly statements: IAuthzStatement[];
}

/**
 * Configuração de permissões para uma entidade.
 */
export interface IAuthzEntityPermissions<
  TCreatePayload = any,
  TFindPayload = any,
  TUpdatePayload = any,
  TDeletePayload = any,
> {
  create?: boolean | IBaseAuthzCheckFn<string, TCreatePayload>;
  find?: boolean | IBaseAuthzFilterFn<string, TFindPayload>;
  update?: boolean | IBaseAuthzFilterFn<string, TUpdatePayload>;
  delete?: boolean | IBaseAuthzFilterFn<string, TDeletePayload>;
}

/**
 * Configuração completa de uma política.
 */
export interface IAuthzPolicySetup {
  [entityName: string]: IAuthzEntityPermissions;
}
