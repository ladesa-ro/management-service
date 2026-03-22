import type { IPersistRepository } from "@/domain/abstractions";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioListQueryResult,
} from "../queries";
/**
 * Token de injeção para o repositório de Usuario
 */
export const IUsuarioRepository = Symbol("IUsuarioRepository");

/**
 * Port de saída para operações de persistência de Usuario
 * Define o contrato que os adapters de persistência devem implementar
 */
export interface IUsuarioRepository extends IPersistRepository<Record<string, any>> {
  /**
   * Lista usuários com paginação
   */
  findAll(
    accessContext: AccessContext | null,
    dto: UsuarioListQuery | null,
    selection?: string[] | boolean | null,
  ): Promise<UsuarioListQueryResult>;

  /**
   * Busca um usuário por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<UsuarioFindOneQueryResult | null>;

  /**
   * Busca um usuário por ID (formato simples)
   */
  findByIdSimple(
    accessContext: AccessContext | null,
    id: string,
    selection?: string[] | boolean | null,
  ): Promise<UsuarioFindOneQueryResult | null>;

  /**
   * Busca um usuário pela matrícula (sem filtro de acesso)
   */
  findByMatricula(
    matricula: string,
    selection?: string[] | boolean | null,
  ): Promise<UsuarioFindOneQueryResult | null>;

  /**
   * Verifica se uma matrícula está disponível
   */
  isMatriculaAvailable(matricula: string, excludeUsuarioId?: string | null): Promise<boolean>;

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
