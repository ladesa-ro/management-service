import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import type { HorarioGeradoEntity } from "@/modules/horario-gerado/infrastructure/persistence/typeorm";
import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoUpdateInputDto,
} from "../dtos";
import { HORARIO_GERADO_REPOSITORY_PORT, type IHorarioGeradoRepositoryPort } from "../ports";

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
    @Inject(HORARIO_GERADO_REPOSITORY_PORT)
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
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
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
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }
}
