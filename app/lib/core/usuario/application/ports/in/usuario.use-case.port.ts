import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  UsuarioCreateInput,
  UsuarioFindOneInput,
  UsuarioFindOneOutput,
  UsuarioListInput,
  UsuarioListOutput,
  UsuarioUpdateInput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Usuario
 * Define o contrato que o service deve implementar
 */
export interface IUsuarioUseCasePort {
  /**
   * Lista usuários com paginação
   */
  usuarioFindAll(
    accessContext: AccessContext,
    dto: UsuarioListInput | null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutput>;

  /**
   * Busca um usuário por ID
   */
  usuarioFindById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null>;

  /**
   * Busca um usuário por ID (lança exceção se não encontrado)
   */
  usuarioFindByIdStrict(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Busca um usuário por ID com seleção simplificada
   */
  usuarioFindByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInput["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutput | null>;

  /**
   * Busca um usuário por ID com seleção simplificada (lança exceção se não encontrado)
   */
  usuarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: UsuarioFindOneInput["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Busca informações de ensino de um usuário
   */
  usuarioEnsinoById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<any>;

  /**
   * Busca interno por matrícula SIAPE
   */
  internalFindByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null>;

  /**
   * Cria um novo usuário
   */
  usuarioCreate(
    accessContext: AccessContext,
    dto: UsuarioCreateInput,
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Atualiza um usuário existente
   */
  usuarioUpdate(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput & UsuarioUpdateInput,
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Obtém a imagem de capa do usuário
   */
  usuarioGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do usuário
   */
  usuarioUpdateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Obtém a imagem de perfil do usuário
   */
  usuarioGetImagemPerfil(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de perfil do usuário
   */
  usuarioUpdateImagemPerfil(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um usuário (soft delete)
   */
  usuarioDeleteOneById(accessContext: AccessContext, dto: UsuarioFindOneInput): Promise<boolean>;
}
