import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoUpdateInputDto,
} from "@/v2/adapters/in/http/horario-gerado/dto";
import type { HorarioGeradoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import type { IHorarioGeradoRepositoryPort } from "../ports";

@Injectable()
export class HorarioGeradoService {
  constructor(
    @Inject("IHorarioGeradoRepositoryPort")
    private horarioGeradoRepository: IHorarioGeradoRepositoryPort,
    private calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto> {
    return this.horarioGeradoRepository.findAll(accessContext, dto, selection);
  }

  async horarioGeradoFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    return this.horarioGeradoRepository.findById(accessContext, dto, selection);
  }

  async horarioGeradoFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    const horario = await this.horarioGeradoRepository.findById(accessContext, dto, selection);

    if (!horario) {
      throw new NotFoundException();
    }

    return horario;
  }

  async horarioGeradoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    return this.horarioGeradoRepository.findByIdSimple(accessContext, id, selection);
  }

  async horarioGeradoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto> {
    const horarioGerado = await this.horarioGeradoRepository.findByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!horarioGerado) {
      throw new NotFoundException();
    }

    return horarioGerado;
  }

  async horarioGeradoCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    await accessContext.ensurePermission("horario_gerado:create", { dto } as any);

    const dtoHorarioGerado = pick(dto, [
      "status",
      "tipo",
      "dataGeracao",
      "vigenciaInicio",
      "vigenciaFim",
    ]);

    const horarioGerado = this.horarioGeradoRepository.create();

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    await this.horarioGeradoRepository.save(horarioGerado);

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  async horarioGeradoUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto> {
    const currentHorarioGerado = await this.horarioGeradoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission("horario_gerado:update", { dto }, dto.id);

    const dtoHorarioGerado = pick(dto, [
      "status",
      "tipo",
      "dataGeracao",
      "vigenciaInicio",
      "vigenciaFim",
    ]);

    const horarioGerado = {
      id: currentHorarioGerado.id,
    } as HorarioGeradoEntity;

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    if (has(dto, "calendario") && dto.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendario!.id,
      );

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    await this.horarioGeradoRepository.save(horarioGerado);

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  async horarioGeradoDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("horario_gerado:delete", { dto }, dto.id);

    const horarioGerado = await this.horarioGeradoFindByIdStrict(accessContext, dto);

    if (horarioGerado) {
      await this.horarioGeradoRepository.softDeleteById(horarioGerado.id);
    }

    return true;
  }
}
