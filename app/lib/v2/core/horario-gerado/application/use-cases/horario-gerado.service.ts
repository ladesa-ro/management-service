import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoUpdateInputDto,
} from "@/v2/server/modules/horario-gerado/http/dto";
import type { HorarioGeradoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { IHorarioGeradoRepositoryPort } from "../ports";

@Injectable()
export class HorarioGeradoService extends BaseCrudService<
  HorarioGeradoEntity,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoCreateInputDto,
  HorarioGeradoUpdateInputDto
> {
  protected readonly resourceName = "HorarioGerado";
  protected readonly createAction = "horario_gerado:create";
  protected readonly updateAction = "horario_gerado:update";
  protected readonly deleteAction = "horario_gerado:delete";
  protected readonly createFields = [
    "status",
    "tipo",
    "dataGeracao",
    "vigenciaInicio",
    "vigenciaFim",
  ] as const;
  protected readonly updateFields = [
    "status",
    "tipo",
    "dataGeracao",
    "vigenciaInicio",
    "vigenciaFim",
  ] as const;

  constructor(
    @Inject("IHorarioGeradoRepositoryPort")
    protected readonly repository: IHorarioGeradoRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: HorarioGeradoEntity,
    dto: HorarioGeradoCreateInputDto,
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
    entity: HorarioGeradoEntity,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }

  // Métodos prefixados para compatibilidade com IHorarioGeradoUseCasePort

  async horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async horarioGeradoFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async horarioGeradoFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async horarioGeradoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async horarioGeradoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async horarioGeradoCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async horarioGeradoUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async horarioGeradoDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
