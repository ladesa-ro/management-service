import type { DeepPartial, SelectQueryBuilder } from "typeorm";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInput,
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
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort {
  /**
   * Lista grade-horario-oferta-formacao-intervalo-de-tempos com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInput | null,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput>;

  /**
   * Busca um grade-horario-oferta-formacao-intervalo-de-tempo por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null>;

  /**
   * Busca simplificada por ID
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null>;

  /**
   * Cria uma nova instância de entidade (não persiste)
   */
  create(): GradeHorarioOfertaFormacaoIntervaloDeTempoEntity;

  /**
   * Mescla dados em uma entidade existente
   */
  merge(
    entity: GradeHorarioOfertaFormacaoIntervaloDeTempoEntity,
    data: DeepPartial<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>,
  ): void;

  /**
   * Salva (cria ou atualiza) uma entidade
   */
  save(
    entity: DeepPartial<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>;

  /**
   * Executa soft delete por ID
   */
  softDeleteById(id: string): Promise<void>;

  /**
   * Cria um QueryBuilder para a entidade.
   * Usado para verificações de permissão com accessContext.ensurePermission.
   * @deprecated Deve ser removido em fases futuras quando a autorização for movida para o adapter
   */
  createQueryBuilder(
    alias: string,
  ): SelectQueryBuilder<GradeHorarioOfertaFormacaoIntervaloDeTempoEntity>;
}
