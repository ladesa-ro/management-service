import type { SelectQueryBuilder } from "typeorm";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempo } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputDto,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/application/dtos";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";

/**
 * Token de injeção para o repositório de GradeHorarioOfertaFormacaoIntervaloDeTempo
 */
export const IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository = Symbol(
  "IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository",
);

/**
 * Port de saída para operações de persistência de GradeHorarioOfertaFormacaoIntervaloDeTempo
 * Estende a interface base de CRUD com operações padrão
 */
export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoRepository
  extends IBaseCrudRepositoryPort<
    GradeHorarioOfertaFormacaoIntervaloDeTempo,
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
