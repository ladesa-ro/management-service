import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { Etapa } from "@/Ladesa.Management.Application/ensino/etapa";
import { CalendarioLetivoService } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "../dtos";
import { IEtapaRepository } from "../ports";

@Injectable()
export class EtapaService extends BaseCrudService<
  Etapa,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaCreateInputDto,
  EtapaUpdateInputDto
> {
  protected readonly resourceName = "Etapa";
  protected readonly createAction = "etapa:create";
  protected readonly updateAction = "etapa:update";
  protected readonly deleteAction = "etapa:delete";

  constructor(
    @Inject(IEtapaRepository)
    protected readonly repository: IEtapaRepository,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: EtapaCreateInputDto,
  ): Promise<Partial<PersistInput<Etapa>>> {
    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }

    const domain = Etapa.criar({
      numero: dto.numero,
      cor: dto.cor,
      dataInicio: dto.dataInicio,
      dataTermino: dto.dataTermino,
      calendario: calendarioRef!,
    });
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
    current: EtapaFindOneOutputDto,
  ): Promise<Partial<PersistInput<Etapa>>> {
    const domain = Etapa.fromData({
      ...current,
      calendarioId: current.calendario.id,
    } as unknown as Etapa);
    domain.atualizar({
      numero: dto.numero,
      cor: dto.cor,
      dataInicio: dto.dataInicio,
      dataTermino: dto.dataTermino,
    });
    const result: Partial<PersistInput<Etapa>> = {
      numero: domain.numero,
      cor: domain.cor,
      dataInicio: domain.dataInicio,
      dataTermino: domain.dataTermino,
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
