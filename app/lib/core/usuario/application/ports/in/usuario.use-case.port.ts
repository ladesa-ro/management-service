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
   * Lista usuarios com paginacao
   */
  findAll(
    accessContext: AccessContext,
    dto: UsuarioListInput | null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutput>;

  /**
   * Busca um usuario por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null>;

  /**
   * Busca um usuario por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Busca um usuario por ID com selecao simplificada
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInput["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutput | null>;

  /**
   * Busca um usuario por ID com selecao simplificada (lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: UsuarioFindOneInput["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Busca informacoes de ensino de um usuario
   */
  usuarioEnsinoById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<any>;

  /**
   * Busca interno por matricula SIAPE
   */
  internalFindByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null>;

  /**
   * Cria um novo usuario
   */
  create(
    accessContext: AccessContext,
    dto: UsuarioCreateInput,
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Atualiza um usuario existente
   */
  update(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput & UsuarioUpdateInput,
  ): Promise<UsuarioFindOneOutput>;

  /**
   * Obtem a imagem de capa do usuario
   */
  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do usuario
   */
  updateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Obtem a imagem de perfil do usuario
   */
  getImagemPerfil(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de perfil do usuario
   */
  updateImagemPerfil(
    accessContext: AccessContext,
    dto: UsuarioFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um usuario (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: UsuarioFindOneInput): Promise<boolean>;
}
