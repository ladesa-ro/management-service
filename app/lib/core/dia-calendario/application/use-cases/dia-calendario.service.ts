import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService } from "@/core/@shared";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import type { DiaCalendarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/dia-calendario.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiaCalendarioCreateInput,
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
  DiaCalendarioUpdateInput,
} from "../dtos";
import { DIA_CALENDARIO_REPOSITORY_PORT, type IDiaCalendarioRepositoryPort } from "../ports";

@Injectable()
export class DiaCalendarioService extends BaseCrudService<
  DiaCalendarioEntity,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioCreateInput,
  DiaCalendarioUpdateInput
> {
  protected readonly resourceName = "DiaCalendario";
  protected readonly createAction = "dia_calendario:create";
  protected readonly updateAction = "dia_calendario:update";
  protected readonly deleteAction = "dia_calendario:delete";
  protected readonly createFields = ["data", "diaLetivo", "feriado"] as const;
  protected readonly updateFields = ["data", "diaLetivo", "feriado"] as const;

  constructor(
    @Inject(DIA_CALENDARIO_REPOSITORY_PORT)
    protected readonly repository: IDiaCalendarioRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  // ========================================
  // Backwards-compatible prefixed methods
  // ========================================

  async diaCalendarioFindAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async diaCalendarioFindById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async diaCalendarioFindByIdStrict(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async diaCalendarioFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async diaCalendarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async diaCalendarioCreate(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInput,
  ): Promise<DiaCalendarioFindOneOutput> {
    return this.create(accessContext, dto);
  }

  async diaCalendarioUpdate(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput & DiaCalendarioUpdateInput,
  ): Promise<DiaCalendarioFindOneOutput> {
    return this.update(accessContext, dto);
  }

  async diaCalendarioDeleteOneById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiaCalendarioEntity,
    dto: DiaCalendarioCreateInput,
  ): Promise<void> {
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: DiaCalendarioEntity,
    dto: DiaCalendarioFindOneInput & DiaCalendarioUpdateInput,
  ): Promise<void> {
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }
}
