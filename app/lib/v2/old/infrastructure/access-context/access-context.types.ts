/**
 * @deprecated Use `import { ... } from "@/modules/@core/access-context"` or `@/modules/@core/authorization` instead.
 * Este arquivo será removido na próxima versão major.
 */
export type { IAccessContext, IContextoDeAcesso } from "@/modules/@core/access-context";

export type {
  IAuthzStatement,
  IAuthzStatementCheck,
  IAuthzStatementFilter,
  IBaseAuthzCheckFn as AuthzCheckFn,
  IBaseAuthzFilterFn as AuthzFilterFn,
  IBaseAuthzStatementContext as IAuthzStatementContext,
  IBaseAuthzStatementKind as AuthzStatementKind,
} from "@/modules/@core/authorization";
