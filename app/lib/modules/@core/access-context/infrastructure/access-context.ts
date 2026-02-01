import { castArray } from "lodash";
import { Brackets, type SelectQueryBuilder } from "typeorm";
import {
  AuthzPolicyPublic,
  type IAuthzPolicy,
  type IAuthzStatement,
  type IBaseAuthzStatementContext,
} from "@/modules/@core/authorization";
import type { IRequestActor } from "@/modules/@core/request-actor";
import { DatabaseContextService } from "@/modules/@database-context";
import { createForbiddenExceptionForAction } from "@/modules/@shared/application/errors";
import type { IAccessContext } from "../domain";
import type { ResourceAuthzRegistry } from "./resource-authz-registry";

// Re-export para compatibilidade
export { AuthzPolicyPublic };
export type { IAuthzPolicy };

/**
 * Contexto de acesso para autorização.
 * Gerencia verificação de permissões e aplicação de filtros.
 */
export class AccessContext implements IAccessContext {
  #policy: IAuthzPolicy = new AuthzPolicyPublic();
  readonly #permissionCheckEnabled: boolean;

  constructor(
    readonly databaseContext: DatabaseContextService,
    readonly requestActor: IRequestActor | null,
    permissionCheckEnabled = false,
    private readonly resourceRegistry?: ResourceAuthzRegistry,
  ) {
    this.#permissionCheckEnabled = permissionCheckEnabled;
  }

  get statements() {
    return this.#policy.statements;
  }

  /**
   * Define a política de autorização.
   */
  setPolicy(policy: IAuthzPolicy): void {
    this.#policy = policy;
  }

  async applyFilter(
    action: string,
    qb: SelectQueryBuilder<any>,
    alias?: string,
    payload: any = null,
  ): Promise<void> {
    const statement = this.getStatementForAction(action);

    if (statement && statement.statementKind === "filter") {
      const context = this.createAuthzStatementContext(action, payload);
      const filter = (statement as any).filter;

      if (typeof filter === "boolean") {
        qb.andWhere(filter ? "TRUE" : "FALSE");
      } else if (typeof filter === "function") {
        const qbFactory = await filter(context, alias ?? qb.alias);
        qb.andWhere(new Brackets(qbFactory));
      }
    } else if (!this.#permissionCheckEnabled) {
      qb.andWhere("TRUE");
    } else {
      qb.andWhere("FALSE");
    }
  }

  async verifyPermission(
    action: string,
    payload: any,
    id: any = null,
    qbInput: SelectQueryBuilder<any> | null = null,
  ): Promise<boolean> {
    const statement = this.getStatementForAction(action);
    const context = this.createAuthzStatementContext(action, payload);

    if (statement) {
      if (statement.statementKind === "check") {
        const withCheck = (statement as any).withCheck;

        if (typeof withCheck === "boolean") {
          return withCheck;
        } else if (typeof withCheck === "function") {
          return withCheck(context);
        }
      } else if (statement.statementKind === "filter") {
        const qb = qbInput ?? this.getQueryBuilderForAction(action);

        await this.applyFilter(action, qb, qb.alias, payload);

        if (id) {
          qb.andWhereInIds(castArray(id));
        }

        return qb.getExists();
      }
    }

    if (!this.#permissionCheckEnabled) {
      return true;
    }

    return false;
  }

  async ensurePermission(
    action: string,
    payload: any,
    id: (number | string) | null = null,
    qb: SelectQueryBuilder<any> | null = null,
  ): Promise<void> {
    const can = await this.verifyPermission(action, payload, id, qb);

    if (!can) {
      throw createForbiddenExceptionForAction(action);
    }
  }

  private getStatementForAction(action: string): IAuthzStatement | null {
    return this.statements.find((statement) => statement.action === action) ?? null;
  }

  private createAuthzStatementContext(
    action: string,
    payload: any,
  ): IBaseAuthzStatementContext<string, any> {
    return {
      action,
      payload,
      accessContext: this as any,
    };
  }

  private getQueryBuilderForAction(action: string): SelectQueryBuilder<any> {
    if (!this.resourceRegistry) {
      throw new Error(
        "ResourceAuthzRegistry is required for authorization. " +
          "Ensure the AccessContext is created with the registry.",
      );
    }

    const qb = this.resourceRegistry.getQueryBuilderForAction(action, this.databaseContext);

    if (!qb) {
      throw new TypeError(
        `getQueryBuilderForAction: no registry entry for action "${action}". ` +
          "Ensure the resource module registers this action in its AuthzRegistrySetup.",
      );
    }

    return qb;
  }
}
