import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import type { EtapaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/etapa.entity";
import type {
  EtapaCreateInputDto,
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaListInputDto,
  EtapaListOutputDto,
  EtapaUpdateInputDto,
} from "@/v2/adapters/in/http/etapa/dto";
import type { IEtapaRepositoryPort } from "../ports";

@Injectable()
export class EtapaService {
  constructor(
    @Inject("IEtapaRepositoryPort")
    private etapaRepository: IEtapaRepositoryPort,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async etapaFindAll(
    accessContext: AccessContext,
    dto: EtapaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutputDto> {
    return this.etapaRepository.findAll(accessContext, dto, selection);
  }

  async etapaFindById(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null> {
    return this.etapaRepository.findById(accessContext, dto, selection);
  }

  async etapaFindByIdStrict(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto> {
    const etapa = await this.etapaRepository.findById(accessContext, dto, selection);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  async etapaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null> {
    return this.etapaRepository.findByIdSimple(accessContext, id, selection);
  }

  async etapaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto> {
    const etapa = await this.etapaRepository.findByIdSimple(accessContext, id, selection);

    if (!etapa) {
      throw new NotFoundException();
    }

    return etapa;
  }

  async etapaCreate(
    accessContext: AccessContext,
    dto: EtapaCreateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    await accessContext.ensurePermission("etapa:create", { dto } as any);

    const dtoEtapa = pick(dto, ["numero", "cor", "dataInicio", "dataTermino"]);

    const etapa = this.etapaRepository.create();

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    await this.etapaRepository.save(etapa);

    return this.etapaFindByIdStrict(accessContext, { id: etapa.id });
  }

  async etapaUpdate(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
  ): Promise<EtapaFindOneOutputDto> {
    const currentEtapa = await this.etapaFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("etapa:update", { dto }, dto.id);

    const dtoEtapa = pick(dto, ["numero", "cor", "dataInicio", "dataTermino"]);

    const etapa = {
      id: currentEtapa.id,
    } as EtapaEntity;

    this.etapaRepository.merge(etapa, {
      ...dtoEtapa,
    });

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario!.id);

      this.etapaRepository.merge(etapa, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    await this.etapaRepository.save(etapa);

    return this.etapaFindByIdStrict(accessContext, { id: etapa.id });
  }

  async etapaDeleteOneById(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("etapa:delete", { dto }, dto.id);

    const etapa = await this.etapaFindByIdStrict(accessContext, dto);

    if (etapa) {
      await this.etapaRepository.softDeleteById(etapa.id);
    }

    return true;
  }
}
