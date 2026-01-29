import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/old/infrastructure/access-context";
import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "@/v2/server/modules/etapa/http/dto";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { IEtapaRepositoryPort } from "../ports";

@Injectable()
export class EtapaService extends BaseCrudService<
  EtapaEntity,
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
  protected readonly createFields = ["numero", "cor", "dataInicio", "dataTermino"] as const;
  protected readonly updateFields = ["numero", "cor", "dataInicio", "dataTermino"] as const;

  constructor(
    @Inject("IEtapaRepositoryPort")
    protected readonly repository: IEtapaRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: EtapaEntity,
    dto: EtapaCreateInputDto,
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
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      this.repository.merge(entity, { calendario: { id: calendario.id } });
    }
  }

  // Métodos prefixados para compatibilidade com IEtapaUseCasePort

  async etapaFindAll(
    accessContext: AccessContext,
    dto: EtapaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async etapaFindById(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async etapaFindByIdStrict(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async etapaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async etapaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async etapaCreate(
    accessContext: AccessContext,
    dto: EtapaCreateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async etapaUpdate(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async etapaDeleteOneById(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
