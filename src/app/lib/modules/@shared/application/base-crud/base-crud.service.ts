import type { StreamableFile } from "@nestjs/common";
import type { AccessContext, IAuthzPayload } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "../errors";
import { getEntityImagemStreamableFile, saveEntityImagemField } from "../helpers";
import type { IAuthorizationServicePort } from "../ports/in";
import type { IBaseCrudRepositoryPort } from "../ports/out";
import type { PersistInput } from "../ports/out/persist-repository.port";

/**
 * Classe base abstrata para services CRUD.
 *
 * Fornece implementações padrão para operações CRUD comuns:
 * - findAll: listagem com paginação
 * - findById: busca por ID
 * - findByIdStrict: busca por ID com exceção se não encontrado
 * - findByIdSimple: busca simplificada por ID
 * - findByIdSimpleStrict: busca simplificada com exceção se não encontrado
 * - create: criação de novo registro
 * - update: atualização de registro existente
 * - deleteOneById: exclusão lógica
 *
 * @template DomainData - Tipo da interface de domínio (ex: IAmbiente, ICampus)
 * @template ListInputDto - Tipo do DTO de entrada para listagem
 * @template ListOutputDto - Tipo do DTO de saída para listagem
 * @template FindOneInputDto - Tipo do DTO de entrada para busca única
 * @template FindOneOutputDto - Tipo do DTO de saída para busca única
 * @template CreateInputDto - Tipo do DTO de entrada para criação
 * @template UpdateInputDto - Tipo do DTO de entrada para atualização
 */
export abstract class BaseCrudService<
  DomainData,
  ListInputDto,
  ListOutputDto,
  FindOneInputDto extends { id: string | number },
  FindOneOutputDto extends { id: string | number },
  CreateInputDto,
  UpdateInputDto,
> {
  /**
   * Nome do recurso para mensagens de erro
   */
  protected abstract readonly resourceName: string;

  /**
   * Ação de autorização para criação (ex: "bloco:create")
   */
  protected abstract readonly createAction: string;

  /**
   * Ação de autorização para atualização (ex: "bloco:update")
   */
  protected abstract readonly updateAction: string;

  /**
   * Ação de autorização para exclusão (ex: "bloco:delete")
   */
  protected abstract readonly deleteAction: string;

  /**
   * Repositório para operações de persistência
   */
  protected abstract readonly repository: IBaseCrudRepositoryPort<
    DomainData,
    ListOutputDto,
    FindOneOutputDto
  >;

  /**
   * Serviço de autorização (opcional).
   * Quando fornecido, é usado para verificações de permissão.
   * Quando não fornecido, usa accessContext.ensurePermission diretamente.
   */
  protected readonly authorizationService?: IAuthorizationServicePort;

  /**
   * Constrói os dados de domínio para criação de uma nova entidade.
   */
  protected abstract buildCreateData(
    accessContext: AccessContext,
    dto: CreateInputDto,
  ): Promise<Partial<PersistInput<DomainData>>>;

  /**
   * Constrói os dados de domínio parciais para atualização de uma entidade existente.
   */
  protected abstract buildUpdateData(
    accessContext: AccessContext,
    dto: FindOneInputDto & UpdateInputDto,
    current: FindOneOutputDto,
  ): Promise<Partial<PersistInput<DomainData>>>;

  /**
   * Lista todos os registros
   */
  async findAll(
    accessContext: AccessContext,
    dto: ListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto> {
    return this.repository.findAll(accessContext, dto, selection);
  }

  /**
   * Busca um registro por ID
   */
  async findById(
    accessContext: AccessContext | null,
    dto: FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null> {
    return this.repository.findById(accessContext, dto, selection);
  }

  /**
   * Busca um registro por ID, lançando exceção se não encontrado
   */
  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto> {
    const entity = await this.findById(accessContext, dto, selection);

    if (!entity) {
      throw new ResourceNotFoundError(this.resourceName, dto.id);
    }

    return entity;
  }

  /**
   * Busca simplificada por ID
   */
  async findByIdSimple(
    accessContext: AccessContext,
    id: string | number,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto | null> {
    if (this.repository.findByIdSimple) {
      return this.repository.findByIdSimple(accessContext, id, selection);
    }
    // Fallback para findById se findByIdSimple não estiver disponível
    return this.repository.findById(accessContext, { id }, selection);
  }

  /**
   * Busca simplificada por ID, lançando exceção se não encontrado
   */
  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string | number,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto> {
    const entity = await this.findByIdSimple(accessContext, id, selection);

    if (!entity) {
      throw new ResourceNotFoundError(this.resourceName, id);
    }

    return entity;
  }

  /**
   * Cria um novo registro
   */
  async create(accessContext: AccessContext, dto: CreateInputDto): Promise<FindOneOutputDto> {
    await this.ensurePermission(accessContext, this.createAction, { dto });

    const domainData = await this.buildCreateData(accessContext, dto);
    const { id } = await this.repository.createFromDomain(domainData);

    return this.findByIdStrict(accessContext, { id } as FindOneInputDto);
  }

  /**
   * Atualiza um registro existente
   */
  async update(
    accessContext: AccessContext,
    dto: FindOneInputDto & UpdateInputDto,
  ): Promise<FindOneOutputDto> {
    const current = await this.findByIdStrict(accessContext, { id: dto.id } as FindOneInputDto);

    await this.ensurePermission(accessContext, this.updateAction, { dto }, dto.id);

    const domainData = await this.buildUpdateData(accessContext, dto, current);
    await this.repository.updateFromDomain(current.id, domainData);

    return this.findByIdStrict(accessContext, { id: dto.id } as FindOneInputDto);
  }

  /**
   * Remove um registro (soft delete)
   */
  async deleteOneById(accessContext: AccessContext, dto: FindOneInputDto): Promise<boolean> {
    await this.ensurePermission(accessContext, this.deleteAction, { dto }, dto.id);

    const entity = await this.findByIdStrict(accessContext, dto);

    if (entity) {
      await this.repository.softDeleteById(entity.id);
    }

    return true;
  }

  /**
   * Verifica permissão usando o serviço de autorização ou accessContext
   */
  protected async ensurePermission(
    accessContext: AccessContext,
    action: string,
    payload: IAuthzPayload,
    id?: string | number | null,
  ): Promise<void> {
    if (this.authorizationService) {
      await this.authorizationService.ensurePermission(action, payload, id);
    } else {
      await accessContext.ensurePermission(action, payload, id ?? null);
    }
  }

  /**
   * Obtém o StreamableFile de um campo de imagem da entidade.
   */
  protected async getImagemField(
    accessContext: AccessContext | null,
    id: string,
    fieldName: string,
    resourceLabel: string,
    imagemService: { getLatestArquivoIdForImagem(imagemId: string): Promise<string | null> },
    arquivoService: {
      getStreamableFile(accessContext: null, dto: { id: string }): Promise<StreamableFile>;
    },
  ): Promise<StreamableFile> {
    const entity = await this.findByIdStrict(accessContext, { id } as FindOneInputDto);
    return getEntityImagemStreamableFile(
      entity as Record<string, any>,
      fieldName,
      resourceLabel,
      id,
      imagemService,
      arquivoService,
    );
  }

  /**
   * Atualiza um campo de imagem da entidade.
   */
  protected async updateImagemField(
    accessContext: AccessContext,
    id: string | number,
    file: Express.Multer.File,
    fieldName: string,
    imagemService: {
      saveImagemCapa(file: Express.Multer.File): Promise<{ imagem: { id: string } }>;
    },
  ): Promise<boolean> {
    const current = await this.findByIdStrict(accessContext, { id } as FindOneInputDto);
    await this.ensurePermission(
      accessContext,
      this.updateAction,
      { dto: { id: current.id } },
      current.id,
    );
    return saveEntityImagemField(current.id, file, fieldName, imagemService, this.repository);
  }
}
