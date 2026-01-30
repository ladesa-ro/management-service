import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "@/v2/server/modules/dia-calendario/http/dto";
import type { DiaCalendarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/dia-calendario.entity";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { IDiaCalendarioRepositoryPort } from "../ports";

@Injectable()
export class DiaCalendarioService extends BaseCrudService<
  DiaCalendarioEntity,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioCreateInputDto,
  DiaCalendarioUpdateInputDto
> {
  protected readonly resourceName = "DiaCalendario";
  protected readonly createAction = "dia_calendario:create";
  protected readonly updateAction = "dia_calendario:update";
  protected readonly deleteAction = "dia_calendario:delete";
  protected readonly createFields = ["data", "diaLetivo", "feriado"] as const;
  protected readonly updateFields = ["data", "diaLetivo", "feriado"] as const;

  constructor(
    @Inject("IDiaCalendarioRepositoryPort")
    protected readonly repository: IDiaCalendarioRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiaCalendarioEntity,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<void> {
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: DiaCalendarioEntity,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }

  // Métodos prefixados para compatibilidade

  async diaCalendarioFindAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async diaCalendarioFindById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async diaCalendarioFindByIdStrict(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async diaCalendarioFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async diaCalendarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async diaCalendarioCreate(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async diaCalendarioUpdate(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async diaCalendarioDeleteOneById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
