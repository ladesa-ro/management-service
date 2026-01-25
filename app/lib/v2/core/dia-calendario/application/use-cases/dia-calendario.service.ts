import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import type { AccessContext } from "@/infrastructure/access-context";
import type { DiaCalendarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities/dia-calendario.entity";
import type {
  DiaCalendarioCreateInputDto,
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
  DiaCalendarioListInputDto,
  DiaCalendarioListOutputDto,
  DiaCalendarioUpdateInputDto,
} from "@/v2/adapters/in/http/dia-calendario/dto";
import type { IDiaCalendarioRepositoryPort } from "../ports";

@Injectable()
export class DiaCalendarioService {
  constructor(
    @Inject("IDiaCalendarioRepositoryPort")
    private diaCalendarioRepository: IDiaCalendarioRepositoryPort,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async diaCalendarioFindAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto> {
    return this.diaCalendarioRepository.findAll(accessContext, dto, selection);
  }

  async diaCalendarioFindById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    return this.diaCalendarioRepository.findById(accessContext, dto, selection);
  }

  async diaCalendarioFindByIdStrict(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const diaCalendario = await this.diaCalendarioRepository.findById(accessContext, dto, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutputDto | null> {
    return this.diaCalendarioRepository.findByIdSimple(accessContext, id, selection);
  }

  async diaCalendarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const diaCalendario = await this.diaCalendarioRepository.findByIdSimple(accessContext, id, selection);

    if (!diaCalendario) {
      throw new NotFoundException();
    }

    return diaCalendario;
  }

  async diaCalendarioCreate(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    await accessContext.ensurePermission("dia_calendario:create", { dto } as any);

    const dtoDiaCalendario = pick(dto, ["data", "dia_letivo", "feriado"]) as Pick<typeof dto, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = this.diaCalendarioRepository.create();

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    } as any);

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    await this.diaCalendarioRepository.save(diaCalendario);

    return this.diaCalendarioFindByIdStrict(accessContext, { id: diaCalendario.id });
  }

  async diaCalendarioUpdate(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto> {
    const currentDiaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("dia_calendario:update", { dto }, dto.id);

    const dtoDiaCalendario = pick(dto, ["data", "dia_letivo", "feriado"]) as Pick<typeof dto, "data" | "diaLetivo" | "feriado">;

    const diaCalendario = {
      id: currentDiaCalendario.id,
    } as DiaCalendarioEntity;

    this.diaCalendarioRepository.merge(diaCalendario, {
      ...dtoDiaCalendario,
    } as any);

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, dto.calendario!.id);

      this.diaCalendarioRepository.merge(diaCalendario, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    await this.diaCalendarioRepository.save(diaCalendario);

    return this.diaCalendarioFindByIdStrict(accessContext, { id: diaCalendario.id });
  }

  async diaCalendarioDeleteOneById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("dia_calendario:delete", { dto }, dto.id);

    const diaCalendario = await this.diaCalendarioFindByIdStrict(accessContext, dto);

    if (diaCalendario) {
      await this.diaCalendarioRepository.softDeleteById(diaCalendario.id);
    }

    return true;
  }
}
