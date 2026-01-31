import type { SelectQueryBuilder } from "typeorm";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
} from "../../dtos";

/**
 * Token de injeção para o repositório de GradeHorarioOfertaFormacaoIntervaloDeTempo
 */
export const GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT = Symbol(
  "IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort",
);

/**
 * Port de saída para operações de persistência de GradeHorarioOfertaFormacaoIntervaloDeTempo
 * Estende a interface base de CRUD com operações padrão
 */
export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort
  extends IBaseCrudRepositoryPort<
    GradeHorarioOfertaFormacaoIntervaloDeTempoEntity,
    GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(
    alias: string,
  ): SelectQueryBuilder<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>;
}
