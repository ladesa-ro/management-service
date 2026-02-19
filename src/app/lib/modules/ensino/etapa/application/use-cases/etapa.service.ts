import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { Etapa, type IEtapa } from "@/modules/ensino/etapa";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "../dtos";
import { ETAPA_REPOSITORY_PORT, type IEtapaRepositoryPort } from "../ports";

@Injectable()
export class EtapaService extends BaseCrudService<
  IEtapa,
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
    @Inject(ETAPA_REPOSITORY_PORT)
    protected readonly repository: IEtapaRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: EtapaCreateInputDto,
  ): Promise<Partial<PersistInput<IEtapa>>> {
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
    return {
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
    current: EtapaFindOneOutputDto,
  ): Promise<Partial<PersistInput<IEtapa>>> {
    const domain = Etapa.fromData(current);
    domain.atualizar({
      numero: dto.numero,
      cor: dto.cor,
      dataInicio: dto.dataInicio,
      dataTermino: dto.dataTermino,
    });
    const result: Partial<PersistInput<IEtapa>> = {
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
      result.calendario = { id: calendario.id };
    }

    return result;
  }
}
