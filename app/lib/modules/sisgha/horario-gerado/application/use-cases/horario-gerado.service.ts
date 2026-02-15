import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/sisgha/calendario-letivo";
import { HorarioGerado, type IHorarioGerado } from "@/modules/sisgha/horario-gerado";
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
  IHorarioGerado,
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
    @Inject(HORARIO_GERADO_REPOSITORY_PORT)
    protected readonly repository: IHorarioGeradoRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<Partial<PersistInput<IHorarioGerado>>> {
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
    return {
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
    current: HorarioGeradoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IHorarioGerado>>> {
    const domain = HorarioGerado.fromData(current);
    domain.atualizar({
      status: dto.status,
      tipo: dto.tipo,
      dataGeracao: dto.dataGeracao,
      vigenciaInicio: dto.vigenciaInicio,
      vigenciaFim: dto.vigenciaFim,
    });
    const result: Partial<PersistInput<IHorarioGerado>> = {
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
      result.calendario = { id: calendario.id };
    }

    return result;
  }
}
