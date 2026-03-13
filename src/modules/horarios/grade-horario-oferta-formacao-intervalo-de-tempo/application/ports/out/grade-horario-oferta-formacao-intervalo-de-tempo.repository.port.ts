import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { IGradeHorarioOfertaFormacaoIntervaloDeTempo } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/modules/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
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
    IGradeHorarioOfertaFormacaoIntervaloDeTempo,
    GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
    GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto
  > {
  /**
   * Busca simplificada por ID - método obrigatório
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(
    alias: string,
  ): SelectQueryBuilder<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>;
}
