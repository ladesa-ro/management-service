import { Inject, Injectable } from "@nestjs/common";
import type { NivelFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "@/v2/server/modules/nivel-formacao/http/dto";
import type { INivelFormacaoRepositoryPort, INivelFormacaoUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo NivelFormacao.
 * Estende BaseCrudService para operações CRUD comuns.
 * Implementa INivelFormacaoUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class NivelFormacaoService
  extends BaseCrudService<
    NivelFormacaoEntity,
    NivelFormacaoListInputDto,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneInputDto,
    NivelFormacaoFindOneOutputDto,
    NivelFormacaoCreateInputDto,
    NivelFormacaoUpdateInputDto
  >
  implements INivelFormacaoUseCasePort
{
  protected readonly resourceName = "NivelFormacao";
  protected readonly createAction = "nivel_formacao:create";
  protected readonly updateAction = "nivel_formacao:update";
  protected readonly deleteAction = "nivel_formacao:delete";
  protected readonly createFields = ["slug"] as const;
  protected readonly updateFields = ["slug"] as const;

  constructor(
    @Inject("INivelFormacaoRepositoryPort")
    protected readonly repository: INivelFormacaoRepositoryPort,
  ) {
    super();
  }

  // Métodos prefixados para compatibilidade com INivelFormacaoUseCasePort

  async nivelFormacaoFindAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<NivelFormacaoListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async nivelFormacaoFindById(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async nivelFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async nivelFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async nivelFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async nivelFormacaoCreate(
    accessContext: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async nivelFormacaoUpdate(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async nivelFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
