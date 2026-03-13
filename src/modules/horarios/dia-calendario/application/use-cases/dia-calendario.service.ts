import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import { DiaCalendario, type IDiaCalendario } from "@/modules/horarios/dia-calendario";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "../dtos";
import { DIA_CALENDARIO_REPOSITORY_PORT, type IDiaCalendarioRepositoryPort } from "../ports";

@Injectable()
export class DiaCalendarioService extends BaseCrudService<
  IDiaCalendario,
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
    @Inject(DIA_CALENDARIO_REPOSITORY_PORT)
    protected readonly repository: IDiaCalendarioRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<Partial<PersistInput<IDiaCalendario>>> {
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
    return {
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
    current: DiaCalendarioFindOneOutputDto,
  ): Promise<Partial<PersistInput<IDiaCalendario>>> {
    const domain = DiaCalendario.fromData(current);
    domain.atualizar({ data: dto.data, diaLetivo: dto.diaLetivo, feriado: dto.feriado });
    const result: Partial<PersistInput<IDiaCalendario>> = {
      data: domain.data,
      diaLetivo: domain.diaLetivo,
      feriado: domain.feriado,
    };

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );
      result.calendario = { id: calendario.id };
    }

    return result;
  }
}
