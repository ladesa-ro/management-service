import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService } from "@/core/@shared";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import type { HorarioGeradoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  HorarioGeradoCreateInput,
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
  HorarioGeradoUpdateInput,
} from "../dtos";
import { HORARIO_GERADO_REPOSITORY_PORT, type IHorarioGeradoRepositoryPort } from "../ports";

@Injectable()
export class HorarioGeradoService extends BaseCrudService<
  HorarioGeradoEntity,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoCreateInput,
  HorarioGeradoUpdateInput
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

  // Metodos prefixados para compatibilidade com IHorarioGeradoUseCasePort

  async horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async horarioGeradoFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async horarioGeradoFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async horarioGeradoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async horarioGeradoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async horarioGeradoCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInput,
  ): Promise<HorarioGeradoFindOneOutput> {
    return this.create(accessContext, dto);
  }

  async horarioGeradoUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput & HorarioGeradoUpdateInput,
  ): Promise<HorarioGeradoFindOneOutput> {
    return this.update(accessContext, dto);
  }

  async horarioGeradoDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: HorarioGeradoEntity,
    dto: HorarioGeradoCreateInput,
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
    dto: HorarioGeradoFindOneInput & HorarioGeradoUpdateInput,
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
