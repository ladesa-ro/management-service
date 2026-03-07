import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { CalendarioLetivoService } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import { DiaCalendario } from "@/Ladesa.Management.Application/horarios/dia-calendario";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "../dtos";
import { IDiaCalendarioRepository } from "../ports";

@Injectable()
export class DiaCalendarioService extends BaseCrudService<
  DiaCalendario,
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

  constructor(
    @Inject(IDiaCalendarioRepository)
    protected readonly repository: IDiaCalendarioRepository,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<Partial<PersistInput<DiaCalendario>>> {
    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }

    const domain = DiaCalendario.criar({
      data: dto.data,
      diaLetivo: dto.diaLetivo,
      feriado: dto.feriado,
      tipo: dto.tipo,
      diaPresencial: dto.diaPresencial,
      extraCurricular: dto.extraCurricular,
      calendario: calendarioRef!,
    });
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
    current: DiaCalendarioFindOneOutputDto,
  ): Promise<Partial<PersistInput<DiaCalendario>>> {
    const domain = DiaCalendario.fromData({
      ...current,
      calendarioId: current.calendario.id,
    } as unknown as DiaCalendario);
    domain.atualizar({ data: dto.data, diaLetivo: dto.diaLetivo, feriado: dto.feriado });
    const result: Partial<PersistInput<DiaCalendario>> = {
      data: domain.data,
      diaLetivo: domain.diaLetivo,
      feriado: domain.feriado,
    };

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );
      result.calendarioId = calendario.id;
    }

    return result;
  }
}
