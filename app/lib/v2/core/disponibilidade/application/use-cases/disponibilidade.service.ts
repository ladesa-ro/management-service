import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "@/v2/server/modules/disponibilidade/http/dto";
import type { DisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { BaseCrudService } from "@/v2/core/shared";
import type { IDisponibilidadeRepositoryPort } from "../ports";

@Injectable()
export class DisponibilidadeService extends BaseCrudService<
  DisponibilidadeEntity,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeCreateInputDto,
  DisponibilidadeUpdateInputDto
> {
  protected readonly resourceName = "Disponibilidade";
  protected readonly createAction = "disponibilidade:create";
  protected readonly updateAction = "disponibilidade:update";
  protected readonly deleteAction = "disponibilidade:delete";
  protected readonly createFields = ["dataInicio", "dataFim"] as const;
  protected readonly updateFields = ["dataInicio", "dataFim"] as const;

  constructor(
    @Inject("IDisponibilidadeRepositoryPort")
    protected readonly repository: IDisponibilidadeRepositoryPort,
  ) {
    super();
  }

  // Métodos prefixados para compatibilidade

  async disponibilidadeFindAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<DisponibilidadeListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async disponibilidadeFindById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async disponibilidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async disponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async disponibilidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async disponibilidadeCreate(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async disponibilidadeUpdate(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async disponibilidadeDeleteOneById(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
