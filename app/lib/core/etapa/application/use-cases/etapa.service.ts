import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";
import { BaseCrudService } from "@/v2/core/shared";
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

  // Metodos prefixados para compatibilidade com IEtapaUseCasePort

  async etapaFindAll(
    accessContext: AccessContext,
    dto: EtapaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async etapaFindById(
    accessContext: AccessContext,
    dto: EtapaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async etapaFindByIdStrict(
    accessContext: AccessContext,
    dto: EtapaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async etapaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async etapaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async etapaCreate(
    accessContext: AccessContext,
    dto: EtapaCreateInput,
  ): Promise<EtapaFindOneOutput> {
    return this.create(accessContext, dto);
  }

  async etapaUpdate(
    accessContext: AccessContext,
    dto: EtapaFindOneInput & EtapaUpdateInput,
  ): Promise<EtapaFindOneOutput> {
    return this.update(accessContext, dto);
  }

  async etapaDeleteOneById(
    accessContext: AccessContext,
    dto: EtapaFindOneInput,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: EtapaEntity,
    dto: EtapaCreateInput,
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
    entity: EtapaEntity,
    dto: EtapaFindOneInput & EtapaUpdateInput,
  ): Promise<void> {
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }
}
