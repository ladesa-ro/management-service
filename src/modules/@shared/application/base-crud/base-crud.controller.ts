import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";

/**
 * Interface que define os métodos padrão de um service CRUD.
 * Controllers que estendem BaseCrudController esperam um service com estes métodos.
 */
export interface IBaseCrudService<
  ListInputDto,
  ListOutputDto,
  FindOneInputDto extends { id: string | number },
  FindOneOutputDto,
  CreateInputDto,
  UpdateInputDto,
> {
  findAll(
    accessContext: AccessContext,
    dto: ListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<ListOutputDto>;

  findByIdStrict(
    accessContext: AccessContext | null,
    dto: FindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<FindOneOutputDto>;

  create(accessContext: AccessContext, dto: CreateInputDto): Promise<FindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: FindOneInputDto & UpdateInputDto,
  ): Promise<FindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: FindOneInputDto): Promise<boolean>;
}

/**
 * Classe base abstrata para controllers CRUD.
 *
 * Devido às limitações do NestJS com decorators em tempo de compilação,
 * esta classe não pode aplicar decorators @Get, @Post, etc automaticamente.
 * Os controllers filhos devem declarar seus próprios métodos com decorators.
 *
 * Esta classe fornece:
 * 1. Tipagem consistente para o service
 * 2. Métodos helper para operações comuns
 * 3. Padrão consistente para implementação de controllers
 *
 * @example
 * ```typescript
 * @Controller("/etapas")
 * export class EtapaController extends BaseCrudController<
 *   EtapaService,
 *   EtapaListInputDto,
 *   EtapaListOutputDto,
 *   EtapaFindOneInputDto,
 *   EtapaFindOneOutputDto,
 *   EtapaCreateInputDto,
 *   EtapaUpdateInputDto
 * > {
 *   constructor(etapaService: EtapaService) {
 *     super(etapaService);
 *   }
 *
 *   @Get("/")
 *   async findAll(
 *     @AccessContextHttp() accessContext: AccessContext,
 *     @Query() dto: EtapaListInputDto,
 *   ): Promise<EtapaListOutputDto> {
 *     return this.handleFindAll(accessContext, dto);
 *   }
 * }
 * ```
 */
export abstract class BaseCrudController<
  Service extends IBaseCrudService<
    ListInputDto,
    ListOutputDto,
    FindOneInputDto,
    FindOneOutputDto,
    CreateInputDto,
    UpdateInputDto
  >,
  ListInputDto,
  ListOutputDto,
  FindOneInputDto extends { id: string | number },
  FindOneOutputDto,
  CreateInputDto,
  UpdateInputDto,
> {
  constructor(protected readonly service: Service) {}

  /**
   * Handler para operação de listagem (GET /)
   */
  protected async handleFindAll(
    accessContext: AccessContext,
    dto: ListInputDto,
  ): Promise<ListOutputDto> {
    return this.service.findAll(accessContext, dto);
  }

  /**
   * Handler para operação de busca por ID (GET /:id)
   */
  protected async handleFindById(
    accessContext: AccessContext | null,
    params: FindOneInputDto,
  ): Promise<FindOneOutputDto> {
    return this.service.findByIdStrict(accessContext, params);
  }

  /**
   * Handler para operação de criação (POST /)
   */
  protected async handleCreate(
    accessContext: AccessContext,
    dto: CreateInputDto,
  ): Promise<FindOneOutputDto> {
    return this.service.create(accessContext, dto);
  }

  /**
   * Handler para operação de atualização (PATCH /:id)
   */
  protected async handleUpdate(
    accessContext: AccessContext,
    params: FindOneInputDto,
    dto: UpdateInputDto,
  ): Promise<FindOneOutputDto> {
    return this.service.update(accessContext, { ...params, ...dto } as FindOneInputDto &
      UpdateInputDto);
  }

  /**
   * Handler para operação de remoção (DELETE /:id)
   */
  protected async handleDelete(
    accessContext: AccessContext,
    params: FindOneInputDto,
  ): Promise<boolean> {
    return this.service.deleteOneById(accessContext, params);
  }
}
