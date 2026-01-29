import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
} from "@/v2/server/modules/usuario/http/dto";
import type { UsuarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

/**
 * Port de saída para operações de persistência de Usuario
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IUsuarioRepositoryPort {
  /**
   * Lista usuários com paginação
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param dto DTO com critérios de busca e paginação
   * @param selection Campos a serem selecionados (GraphQL/otimização)
   * @returns Lista paginada de usuários
   */
  findAll(
    accessContext: AccessContext,
    dto: UsuarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto>;

  /**
   * Busca um usuário por ID
   * @param accessContext Contexto de acesso para aplicar filtros de permissão (pode ser null)
   * @param dto DTO com ID do usuário
   * @param selection Campos a serem selecionados
   * @returns Usuário encontrado ou null
   */
  findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuário por ID (formato simples)
   * @param accessContext Contexto de acesso para aplicar filtros de permissão
   * @param id ID do usuário
   * @param selection Campos a serem selecionados
   * @returns Usuário encontrado ou null
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuário pela matrícula SIAPE (sem filtro de acesso)
   * @param matriculaSiape Matrícula SIAPE do usuário
   * @param selection Campos a serem selecionados
   * @returns Usuário encontrado ou null
   */
  findByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Verifica se uma matrícula SIAPE está disponível
   * @param matriculaSiape Matrícula SIAPE a verificar
   * @param excludeUsuarioId ID do usuário a excluir da verificação (para update)
   * @returns true se disponível, false se já existe
   */
  isMatriculaSiapeAvailable(
    matriculaSiape: string,
    excludeUsuarioId?: string | null,
  ): Promise<boolean>;

  /**
   * Verifica se um e-mail está disponível
   * @param email E-mail a verificar
   * @param excludeUsuarioId ID do usuário a excluir da verificação (para update)
   * @returns true se disponível, false se já existe
   */
  isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean>;

  /**
   * Resolve uma propriedade simples de um usuário por ID
   * @param id ID do usuário
   * @param property Nome da propriedade a resolver
   * @returns Valor da propriedade
   */
  resolveProperty<Property extends keyof UsuarioEntity>(
    id: string,
    property: Property,
  ): Promise<UsuarioEntity[Property]>;

  /**
   * Salva (cria ou atualiza) um usuário
   * @param usuario Dados parciais do usuário a ser salvo
   * @returns Usuário salvo
   */
  save(usuario: DeepPartial<UsuarioEntity>): Promise<UsuarioEntity>;

  /**
   * Cria uma nova entidade usuário
   * @returns Nova instância de UsuarioEntity
   */
  create(): UsuarioEntity;

  /**
   * Mescla dados parciais em um usuário existente
   * @param usuario Usuário base
   * @param data Dados a serem mesclados
   */
  merge(usuario: UsuarioEntity, data: DeepPartial<UsuarioEntity>): void;

  /**
   * Soft delete de um usuário por ID
   * @param id ID do usuário
   */
  softDeleteById(id: string): Promise<void>;
}
