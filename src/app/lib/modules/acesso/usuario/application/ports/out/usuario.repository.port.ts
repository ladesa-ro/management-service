import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IPersistRepositoryPort } from "@/modules/@shared";
import type {
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
} from "../../dtos";

/**
 * Token de injeção para o repositório de Usuario
 */
export const USUARIO_REPOSITORY_PORT = Symbol("IUsuarioRepositoryPort");

/**
 * Port de saída para operações de persistência de Usuario
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IUsuarioRepositoryPort extends IPersistRepositoryPort<Record<string, any>> {
  /**
   * Lista usuários com paginação
   */
  findAll(
    accessContext: AccessContext,
    dto: UsuarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto>;

  /**
   * Busca um usuário por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuário por ID (formato simples)
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuário pela matrícula SIAPE (sem filtro de acesso)
   */
  findByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Verifica se uma matrícula SIAPE está disponível
   */
  isMatriculaSiapeAvailable(
    matriculaSiape: string,
    excludeUsuarioId?: string | null,
  ): Promise<boolean>;

  /**
   * Verifica se um e-mail está disponível
   */
  isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean>;

  /**
   * Resolve uma propriedade simples de um usuário por ID
   */
  resolveProperty<Property extends string>(id: string, property: Property): Promise<any>;

  /**
   * Soft delete de um usuário por ID
   */
  softDeleteById(id: string): Promise<void>;

  /**
   * Busca os dados de ensino do usuário (disciplinas, cursos e turmas onde é professor ativo)
   */
  findUsuarioEnsino(usuarioId: string): Promise<{
    disciplinas: Array<{
      disciplina: any;
      cursos: Array<{
        curso: any;
        turmas: Array<{
          turma: any;
        }>;
      }>;
    }>;
  }>;
}
