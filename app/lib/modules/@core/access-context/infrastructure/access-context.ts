import { castArray } from "lodash";
import type { SelectQueryBuilder } from "typeorm";
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
        qb.andWhere(qbFactory);
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
    // Tenta usar o registry primeiro
    if (this.resourceRegistry) {
      const qb = this.resourceRegistry.getQueryBuilderForAction(action, this.databaseContext);
      if (qb) {
        return qb;
      }
    }

    // Fallback para o switch case legado (será removido gradualmente)
    return this.getQueryBuilderForActionLegacy(action);
  }

  /**
   * @deprecated Será removido após migração completa para ResourceAuthzRegistry
   */
  private getQueryBuilderForActionLegacy(action: string): SelectQueryBuilder<any> {
    switch (action) {
      case "estado:find": {
        return this.databaseContext.estadoRepository.createQueryBuilder("estado");
      }

      case "cidade:find": {
        return this.databaseContext.cidadeRepository.createQueryBuilder("cidade");
      }

      case "endereco:find": {
        return this.databaseContext.enderecoRepository.createQueryBuilder("endereco");
      }

      case "campus:find":
      case "campus:update":
      case "campus:delete": {
        return this.databaseContext.campusRepository.createQueryBuilder("campus");
      }

      case "bloco:find":
      case "bloco:update":
      case "bloco:delete": {
        return this.databaseContext.blocoRepository.createQueryBuilder("bloco");
      }

      case "ambiente:find":
      case "ambiente:update":
      case "ambiente:delete": {
        return this.databaseContext.ambienteRepository.createQueryBuilder("ambiente");
      }

      case "usuario:find":
      case "usuario:update":
      case "usuario:delete": {
        return this.databaseContext.usuarioRepository.createQueryBuilder("usuario");
      }

      case "modalidade:find":
      case "modalidade:update":
      case "modalidade:delete": {
        return this.databaseContext.modalidadeRepository.createQueryBuilder("modalidade");
      }

      case "vinculo:find": {
        return this.databaseContext.perfilRepository.createQueryBuilder("vinculo");
      }

      case "curso:update":
      case "curso:delete":
      case "curso:find": {
        return this.databaseContext.cursoRepository.createQueryBuilder("curso");
      }

      case "disciplina:update":
      case "disciplina:delete":
      case "disciplina:find": {
        return this.databaseContext.disciplinaRepository.createQueryBuilder("disciplina");
      }

      case "turma:update":
      case "turma:delete":
      case "turma:find": {
        return this.databaseContext.turmaRepository.createQueryBuilder("turma");
      }

      case "diario:update":
      case "diario:delete":
      case "diario:find": {
        return this.databaseContext.diarioRepository.createQueryBuilder("diario");
      }

      case "reserva:update":
      case "reserva:delete":
      case "reserva:find": {
        return this.databaseContext.reservaRepository.createQueryBuilder("reserva");
      }

      case "calendario_letivo:update":
      case "calendario_letivo:delete":
      case "calendario_letivo:find": {
        return this.databaseContext.calendarioLetivoRepository.createQueryBuilder(
          "calendarioLetivo",
        );
      }

      case "aula:update":
      case "aula:delete":
      case "aula:find": {
        return this.databaseContext.aulaRepository.createQueryBuilder("aula");
      }

      case "dia_calendario:update":
      case "dia_calendario:delete":
      case "dia_calendario:find": {
        return this.databaseContext.diaCalendarioRepository.createQueryBuilder("diaCalendario");
      }

      case "disponibilidade:update":
      case "disponibilidade:delete":
      case "disponibilidade:find": {
        return this.databaseContext.disponibilidadeRepository.createQueryBuilder("disponibilidade");
      }

      case "diario_preferencia_agrupamento:update":
      case "diario_preferencia_agrupamento:delete":
      case "diario_preferencia_agrupamento:find": {
        return this.databaseContext.diarioPreferenciaAgrupamentoRepository.createQueryBuilder(
          "diario_preferencia_agrupamento",
        );
      }

      case "diario_professor:update":
      case "diario_professor:delete":
      case "diario_professor:find": {
        return this.databaseContext.diarioProfessorRepository.createQueryBuilder(
          "diario_professor",
        );
      }

      case "etapa:update":
      case "etapa:delete":
      case "etapa:find": {
        return this.databaseContext.etapaRepository.createQueryBuilder("etapa");
      }

      case "evento:delete":
      case "evento:update":
      case "evento:find": {
        return this.databaseContext.eventoRepository.createQueryBuilder("evento");
      }

      case "grade_horario_oferta_formacao:delete":
      case "grade_horario_oferta_formacao:update":
      case "grade_horario_oferta_formacao:find": {
        return this.databaseContext.gradeHorarioOfertaFormacaoRepository.createQueryBuilder(
          "grade_horario_oferta_formacao",
        );
      }

      case "grade_horario_oferta_formacao_intervalo_de_tempo:delete":
      case "grade_horario_oferta_formacao_intervalo_de_tempo:update":
      case "grade_horario_oferta_formacao_intervalo_de_tempo:find": {
        return this.databaseContext.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
          "grade_horario_oferta_formacao_intervalo_de_tempo",
        );
      }

      case "horario_gerado:delete":
      case "horario_gerado:update":
      case "horario_gerado:find": {
        return this.databaseContext.horarioGeradoRepository.createQueryBuilder("horario_gerado");
      }

      case "horario_gerado_aula:delete":
      case "horario_gerado_aula:update":
      case "horario_gerado_aula:find": {
        return this.databaseContext.horarioGeradoAulaRepository.createQueryBuilder(
          "horario_gerado_aula",
        );
      }

      case "nivel_formacao:delete":
      case "nivel_formacao:update":
      case "nivel_formacao:find": {
        return this.databaseContext.nivelFormacaoRepository.createQueryBuilder("nivel_formacao");
      }

      case "oferta_formacao:delete":
      case "oferta_formacao:update":
      case "oferta_formacao:find": {
        return this.databaseContext.ofertaFormacaoRepository.createQueryBuilder("oferta_formacao");
      }

      case "oferta_formacao_nivel_formacao:delete":
      case "oferta_formacao_nivel_formacao:update":
      case "oferta_formacao_nivel_formacao:find": {
        return this.databaseContext.ofertaFormacaoNivelFormacaoRepository.createQueryBuilder(
          "oferta_formacao_nivel_formacao",
        );
      }

      case "professor_disponibilidade:delete":
      case "professor_disponibilidade:update":
      case "professor_disponibilidade:find": {
        return this.databaseContext.professorIndisponibilidadeRepository.createQueryBuilder(
          "professor_indisponibilidade",
        );
      }

      case "turma_disponibilidade:delete":
      case "turma_disponibilidade:update":
      case "turma_disponibilidade:find": {
        return this.databaseContext.turmaDisponibilidadeRepository.createQueryBuilder(
          "turma_disponibilidade",
        );
      }

      default: {
        throw new TypeError(`getQueryBuilderForAction: dont have repository for action: ${action}`);
      }
    }
  }
}
