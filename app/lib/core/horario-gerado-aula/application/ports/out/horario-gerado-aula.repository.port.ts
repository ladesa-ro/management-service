import type { DeepPartial } from "typeorm";
import type { HorarioGeradoAulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  HorarioGeradoAulaFindOneInput,
  HorarioGeradoAulaFindOneOutput,
  HorarioGeradoAulaListInput,
  HorarioGeradoAulaListOutput,
} from "../../dtos";

/**
 * Token de injecao para o repositorio de HorarioGeradoAula
 */
export const HORARIO_GERADO_AULA_REPOSITORY_PORT = Symbol("IHorarioGeradoAulaRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de HorarioGeradoAula
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IHorarioGeradoAulaRepositoryPort {
  /**
   * Lista horarios gerados de aula com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de horarios gerados de aula
   */
  findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInput | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutput>;

  /**
   * Busca um horario gerado de aula por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID do horario gerado de aula
   * @param selection Campos a serem selecionados
   * @returns HorarioGeradoAula encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutput | null>;

  /**
   * Busca um horario gerado de aula por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID do horario gerado de aula
   * @param selection Campos a serem selecionados
   * @returns HorarioGeradoAula encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) um horario gerado de aula
   * @param horarioGeradoAula Dados parciais do horario gerado de aula a ser salvo
   * @returns HorarioGeradoAula salvo
   */
  save(horarioGeradoAula: DeepPartial<HorarioGeradoAulaEntity>): Promise<HorarioGeradoAulaEntity>;

  /**
   * Cria uma nova entidade horario gerado de aula
   * @returns Nova instancia de HorarioGeradoAulaEntity
   */
  create(): HorarioGeradoAulaEntity;

  /**
   * Mescla dados parciais em um horario gerado de aula existente
   * @param horarioGeradoAula HorarioGeradoAula base
   * @param data Dados a serem mesclados
   */
  merge(
    horarioGeradoAula: HorarioGeradoAulaEntity,
    data: DeepPartial<HorarioGeradoAulaEntity>,
  ): void;

  /**
   * Soft delete de um horario gerado de aula por ID
   * @param id ID do horario gerado de aula
   */
  softDeleteById(id: string): Promise<void>;
}
