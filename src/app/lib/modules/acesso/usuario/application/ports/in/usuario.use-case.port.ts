import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  UsuarioCreateInputDto,
  UsuarioEnsinoOutput,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
  UsuarioUpdateInputDto,
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
    dto: UsuarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<UsuarioListOutputDto>;

  /**
   * Busca um usuario por ID
   */
  findById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuario por ID (lanca excecao se nao encontrado)
   */
  findByIdStrict(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Busca um usuario por ID com selecao simplificada
   */
  findByIdSimple(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Busca um usuario por ID com selecao simplificada (lanca excecao se nao encontrado)
   */
  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: UsuarioFindOneInputDto["id"],
    selection?: string[],
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Busca informacoes de ensino de um usuario (disciplinas, cursos e turmas onde leciona)
   */
  usuarioEnsinoById(
    accessContext: AccessContext | null,
    dto: UsuarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<UsuarioEnsinoOutput>;

  /**
   * Busca interno por matricula SIAPE
   */
  internalFindByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutputDto | null>;

  /**
   * Cria um novo usuario
   */
  create(
    accessContext: AccessContext,
    dto: UsuarioCreateInputDto,
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Atualiza um usuario existente
   */
  update(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto & UsuarioUpdateInputDto,
  ): Promise<UsuarioFindOneOutputDto>;

  /**
   * Obtem a imagem de capa do usuario
   */
  getImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  /**
   * Atualiza a imagem de capa do usuario
   */
  updateImagemCapa(
    accessContext: AccessContext,
    dto: UsuarioFindOneInputDto,
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
    dto: UsuarioFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  /**
   * Remove um usuario (soft delete)
   */
  deleteOneById(accessContext: AccessContext, dto: UsuarioFindOneInputDto): Promise<boolean>;
}
