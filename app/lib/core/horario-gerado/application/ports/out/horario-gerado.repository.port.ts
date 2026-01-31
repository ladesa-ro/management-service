import type { PartialEntity } from "@/core/@shared";
import type { HorarioGeradoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
} from "../../dtos";

/**
 * Token de injecao para o repositorio de HorarioGerado
 */
export const HORARIO_GERADO_REPOSITORY_PORT = Symbol("IHorarioGeradoRepositoryPort");

/**
 * Port de saida para operacoes de persistencia de HorarioGerado
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IHorarioGeradoRepositoryPort {
  /**
   * Lista horarios gerados com paginacao
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com criterios de busca e paginacao
   * @param selection Campos a serem selecionados (GraphQL/otimizacao)
   * @returns Lista paginada de horarios gerados
   */
  findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInput | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutput>;

  /**
   * Busca um horario gerado por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param dto DTO com ID do horario gerado
   * @param selection Campos a serem selecionados
   * @returns HorarioGerado encontrado ou null
   */
  findById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutput | null>;

  /**
   * Busca um horario gerado por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissao
   * @param id ID do horario gerado
   * @param selection Campos a serem selecionados
   * @returns HorarioGerado encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutput | null>;

  /**
   * Salva (cria ou atualiza) um horario gerado
   * @param horarioGerado Dados parciais do horario gerado a ser salvo
   * @returns HorarioGerado salvo
   */
  save(horarioGerado: PartialEntity<HorarioGeradoEntity>): Promise<HorarioGeradoEntity>;

  /**
   * Cria uma nova entidade horario gerado
   * @returns Nova instancia de HorarioGeradoEntity
   */
  create(): HorarioGeradoEntity;

  /**
   * Mescla dados parciais em um horario gerado existente
   * @param horarioGerado HorarioGerado base
   * @param data Dados a serem mesclados
   */
  merge(horarioGerado: HorarioGeradoEntity, data: PartialEntity<HorarioGeradoEntity>): void;

  /**
   * Soft delete de um horario gerado por ID
   * @param id ID do horario gerado
   */
  softDeleteById(id: string): Promise<void>;
}
