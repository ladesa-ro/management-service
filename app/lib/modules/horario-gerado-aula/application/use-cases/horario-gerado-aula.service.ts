import { Inject, Injectable } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import { DiarioProfessorService } from "@/modules/diario-professor/application/use-cases/diario-professor.service";
import { HorarioGeradoService } from "@/modules/horario-gerado";
import type { HorarioGeradoAulaEntity } from "@/modules/horario-gerado-aula/infrastructure/persistence/typeorm";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type {
  HorarioGeradoAulaCreateInput,
  HorarioGeradoAulaFindOneInput,
  HorarioGeradoAulaFindOneOutput,
  HorarioGeradoAulaListInput,
  HorarioGeradoAulaListOutput,
  HorarioGeradoAulaUpdateInput,
} from "../dtos";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  type IHorarioGeradoAulaRepositoryPort,
} from "../ports";

@Injectable()
export class HorarioGeradoAulaService {
  constructor(
    @Inject(HORARIO_GERADO_AULA_REPOSITORY_PORT)
    private horarioGeradoAulaRepository: IHorarioGeradoAulaRepositoryPort,
    private diarioProfessorService: DiarioProfessorService,
    private horarioGeradoService: HorarioGeradoService,
    private intervaloDeTempoService: IntervaloDeTempoService,
  ) {}

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutput> {
    return this.horarioGeradoAulaRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutput | null> {
    return this.horarioGeradoAulaRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutput> {
    const horarioGeradoAula = await this.horarioGeradoAulaRepository.findById(
      accessContext,
      dto,
      selection,
    );

    if (!horarioGeradoAula) {
      throw new ResourceNotFoundError("HorarioGeradoAula", dto.id);
    }

    return horarioGeradoAula;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput | null> {
    return this.horarioGeradoAulaRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput> {
    const horarioGeradoAula = await this.horarioGeradoAulaRepository.findByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!horarioGeradoAula) {
      throw new ResourceNotFoundError("HorarioGeradoAula", id);
    }

    return horarioGeradoAula;
  }

  // Legacy method aliases for compatibility
  async horarioGeradoAulaFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async horarioGeradoAulaFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async horarioGeradoAulaFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async horarioGeradoAulaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async horarioGeradoAulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async horarioGeradoAulaCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInput,
  ): Promise<HorarioGeradoAulaFindOneOutput> {
    await accessContext.ensurePermission("horario_gerado_aula:create", { dto } as any);

    const dtoHorarioGeradoAula = pick(dto, ["diaSemanaIso"]);

    const horarioGeradoAula = this.horarioGeradoAulaRepository.create();

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    if (dto.diarioProfessor) {
      const diario = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor,
      );

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diario.id,
        },
      });
    }

    if (dto.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        intervaloDeTempo: {
          id: intervalo!.id,
        },
      });
    }

    await this.horarioGeradoAulaRepository.save(horarioGeradoAula);

    return this.findByIdStrict(accessContext, {
      id: horarioGeradoAula.id,
    });
  }

  async HorarioGeradoAulaUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput & HorarioGeradoAulaUpdateInput,
  ): Promise<HorarioGeradoAulaFindOneOutput> {
    const currentHorarioGeradoAula = await this.findByIdStrict(accessContext, dto);

    await accessContext.ensurePermission("horario_gerado_aula:update", { dto }, dto.id);

    const dtoHorarioGeradoAula = pick(dto, ["diaSemanaIso"]);

    const horarioGeradoAula = {
      id: currentHorarioGeradoAula.id,
    } as HorarioGeradoAulaEntity;

    this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
      ...dtoHorarioGeradoAula,
    });

    if (has(dto, "diarioProfessor") && dto.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor!,
      );

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        diarioProfessor: {
          id: diarioProfessor.id,
        },
      });
    }

    if (has(dto, "horarioGerado") && dto.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        horarioGerado: {
          id: horarioGerado.id,
        },
      });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );

      this.horarioGeradoAulaRepository.merge(horarioGeradoAula, {
        intervaloDeTempo: {
          id: intervaloDeTempo!.id,
        },
      });
    }

    await this.horarioGeradoAulaRepository.save(horarioGeradoAula);

    return this.findByIdStrict(accessContext, {
      id: horarioGeradoAula.id,
    });
  }

  async horarioGeradoAulaDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission("horario_gerado_aula:delete", { dto }, dto.id);

    const horarioGerado = await this.findByIdStrict(accessContext, dto);

    if (horarioGerado) {
      await this.horarioGeradoAulaRepository.softDeleteById(horarioGerado.id);
    }

    return true;
  }
}
