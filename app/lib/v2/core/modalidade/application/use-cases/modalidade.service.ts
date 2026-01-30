import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "@/v2/server/modules/modalidade/http/dto";
import type { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { BaseCrudService } from "@/v2/core/shared";
import type { IModalidadeRepositoryPort, IModalidadeUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo Modalidade.
 * Estende BaseCrudService para operações CRUD comuns.
 * Implementa IModalidadeUseCasePort para compatibilidade com a interface existente.
 */
@Injectable()
export class ModalidadeService
  extends BaseCrudService<
    ModalidadeEntity,
    ModalidadeListInputDto,
    ModalidadeListOutputDto,
    ModalidadeFindOneInputDto,
    ModalidadeFindOneOutputDto,
    ModalidadeCreateInputDto,
    ModalidadeUpdateInputDto
  >
  implements IModalidadeUseCasePort
{
  protected readonly resourceName = "Modalidade";
  protected readonly createAction = "modalidade:create";
  protected readonly updateAction = "modalidade:update";
  protected readonly deleteAction = "modalidade:delete";
  protected readonly createFields = ["nome", "slug"] as const;
  protected readonly updateFields = ["nome", "slug"] as const;

  constructor(
    @Inject("IModalidadeRepositoryPort")
    protected readonly repository: IModalidadeRepositoryPort,
  ) {
    super();
  }

  // Métodos prefixados para compatibilidade com IModalidadeUseCasePort

  async modalidadeFindAll(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<ModalidadeListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async modalidadeFindById(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async modalidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async modalidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async modalidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async modalidadeCreate(
    accessContext: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async modalidadeUpdate(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async modalidadeDeleteOneById(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
