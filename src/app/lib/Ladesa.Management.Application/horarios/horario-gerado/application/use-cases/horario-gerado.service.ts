import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { CalendarioLetivoService } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import { HorarioGerado } from "@/Ladesa.Management.Application/horarios/horario-gerado";
import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoUpdateInputDto,
} from "../dtos";
import { IHorarioGeradoRepository } from "../ports";

@Injectable()
export class HorarioGeradoService extends BaseCrudService<
  HorarioGerado,
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

  constructor(
    @Inject(IHorarioGeradoRepository)
    protected readonly repository: IHorarioGeradoRepository,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<Partial<PersistInput<HorarioGerado>>> {
    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }

    const domain = HorarioGerado.criar({
      status: dto.status,
      tipo: dto.tipo,
      dataGeracao: dto.dataGeracao,
      vigenciaInicio: dto.vigenciaInicio,
      vigenciaFim: dto.vigenciaFim,
      calendario: calendarioRef!,
    });
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
    current: HorarioGeradoFindOneOutputDto,
  ): Promise<Partial<PersistInput<HorarioGerado>>> {
    const domain = HorarioGerado.fromData({
      ...current,
      calendarioId: current.calendario.id,
    } as unknown as HorarioGerado);
    domain.atualizar({
      status: dto.status,
      tipo: dto.tipo,
      dataGeracao: dto.dataGeracao,
      vigenciaInicio: dto.vigenciaInicio,
      vigenciaFim: dto.vigenciaFim,
    });
    const result: Partial<PersistInput<HorarioGerado>> = {
      status: domain.status,
      tipo: domain.tipo,
      dataGeracao: domain.dataGeracao,
      vigenciaInicio: domain.vigenciaInicio,
      vigenciaFim: domain.vigenciaFim,
    };

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      result.calendarioId = calendario.id;
    }

    return result;
  }
}
