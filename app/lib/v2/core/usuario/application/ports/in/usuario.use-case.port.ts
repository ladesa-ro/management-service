import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  UsuarioCreateInputDto,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
  UsuarioUpdateInputDto,
} from "@/v2/server/modules/usuario/http/dto";

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
    dto: UsuarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto>;

  /**
   * Busca um usuário por ID
   */
  usuarioFindById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuário por ID (lança exceção se não encontrado)
   */
  usuarioFindByIdStrict(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Busca um usuário por ID com seleção simplificada
   */
  usuarioFindByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuário por ID com seleção simplificada (lança exceção se não encontrado)
   */
  usuarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Busca informações de ensino de um usuário
   */
  usuarioEnsinoById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<any>;

  /**
   * Busca interno por matrícula SIAPE
   */
  internalFindByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Cria um novo usuário
   */
  usuarioCreate(
    accessContext: AccessContext,
    dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Atualiza um usuário existente
   */
  usuarioUpdate(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto & UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Obtém a imagem de capa do usuário
   */
  usuarioGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do usuário
   */
  usuarioUpdateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
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
    dto: UsuarioFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um usuário (soft delete)
   */
  usuarioDeleteOneById(accessContext: AccessContext, dto: UsuarioFindOneInputDto): Promise<boolean>;
}
