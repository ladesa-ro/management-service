import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService } from "@/core/@shared";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  EtapaCreateInput,
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaListInput,
  EtapaListOutput,
  EtapaUpdateInput,
} from "../dtos";
import { ETAPA_REPOSITORY_PORT, type IEtapaRepositoryPort } from "../ports";

@Injectable()
export class EtapaService extends BaseCrudService<
  EtapaEntity,
  EtapaListInput,
  EtapaListOutput,
  EtapaFindOneInput,
  EtapaFindOneOutput,
  EtapaCreateInput,
  EtapaUpdateInput
> {
  protected readonly resourceName = "Etapa";
  protected readonly createAction = "etapa:create";
  protected readonly updateAction = "etapa:update";
  protected readonly deleteAction = "etapa:delete";
  protected readonly createFields = ["numero", "cor", "dataInicio", "dataTermino"] as const;
  protected readonly updateFields = ["numero", "cor", "dataInicio", "dataTermino"] as const;

  constructor(
    @Inject(ETAPA_REPOSITORY_PORT)
    protected readonly repository: IEtapaRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: EtapaEntity,
    dto: EtapaCreateInput,
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
    entity: EtapaEntity,
    dto: EtapaFindOneInput & EtapaUpdateInput,
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
