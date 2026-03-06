import type {
  IAuthzPolicy,
  IAuthzPolicySetup,
  IAuthzStatement,
  IBaseAuthzCheckFn,
  IBaseAuthzFilterFn,
} from "../../domain";

/**
 * Lista de entidades suportadas pelo sistema de autorização.
 */
export const AUTHZ_ENTITIES = [
  "diario",
  "endereco",
  "estado",
  "cidade",
  "campus",
  "bloco",
  "ambiente",
  "reserva",
  "usuario",
  "modalidade",
  "vinculo",
  "curso",
  "disciplina",
  "turma",
  "calendario_letivo",
  "etapa",
  "aula",
  "dia_calendario",
  "evento",
  "diario_professor",
  "diario_preferencia_agrupamento",
  "horario_gerado",
  "horario_gerado_aula",
  "disponibilidade",
  "grade_horario_oferta_formacao",
  "grade_horario_oferta_formacao_intervalo_de_tempo",
  "nivel_formacao",
  "oferta_formacao",
  "oferta_formacao_nivel_formacao",
  "professor_disponibilidade",
  "turma_disponibilidade",
] as const;

export type AuthzEntityName = (typeof AUTHZ_ENTITIES)[number];

/**
 * Classe base para políticas de autorização.
 */
export abstract class BaseAuthzPolicy implements IAuthzPolicy {
  private readonly _statements: IAuthzStatement[] = [];

  constructor(setup: IAuthzPolicySetup) {
    this.buildStatements(setup);
  }

  get statements(): IAuthzStatement[] {
    return this._statements;
  }

  private buildStatements(setup: IAuthzPolicySetup): void {
    for (const [entityName, permissions] of Object.entries(setup)) {
      if (permissions.create !== undefined) {
        this.addCheckStatement(entityName, "create", permissions.create);
      }
      if (permissions.find !== undefined) {
        this.addFilterStatement(entityName, "find", permissions.find);
      }
      if (permissions.update !== undefined) {
        this.addFilterStatement(entityName, "update", permissions.update);
      }
      if (permissions.delete !== undefined) {
        this.addFilterStatement(entityName, "delete", permissions.delete);
      }
    }
  }

  private addCheckStatement(
    entity: string,
    action: string,
    value: boolean | IBaseAuthzCheckFn<string, any>,
  ): void {
    this._statements.push({
      statementKind: "check",
      action: `${entity}:${action}`,
      payload: null as any,
      withCheck: value,
    } as IAuthzStatement);
  }

  private addFilterStatement(
    entity: string,
    action: string,
    value: boolean | IBaseAuthzFilterFn<string, any>,
  ): void {
    this._statements.push({
      statementKind: "filter",
      action: `${entity}:${action}`,
      payload: null as any,
      filter: value,
    } as IAuthzStatement);
  }
}
