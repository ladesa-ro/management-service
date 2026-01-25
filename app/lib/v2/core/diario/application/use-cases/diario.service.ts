import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "@/v2/adapters/in/http/diario/dto";
import type { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { CalendarioLetivoService } from "@/v2/core/calendario-letivo/application/use-cases/calendario-letivo.service";
import { DisciplinaService } from "@/v2/core/disciplina/application/use-cases/disciplina.service";
import { TurmaService } from "@/v2/core/turma/application/use-cases/turma.service";
import type { IDiarioRepositoryPort, IDiarioUseCasePort } from "../ports";

@Injectable()
export class DiarioService implements IDiarioUseCasePort {
  constructor(
    @Inject("IDiarioRepositoryPort")
    private diarioRepository: IDiarioRepositoryPort,
    private calendarioLetivoService: CalendarioLetivoService,
    private turmaService: TurmaService,
    private disciplinaService: DisciplinaService,
    private ambienteService: AmbienteService,
  ) {}

  async diarioFindAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto> {
    return this.diarioRepository.findAll(accessContext, dto, selection);
  }

  async diarioFindById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    return this.diarioRepository.findById(accessContext, dto, selection);
  }

  async diarioFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto> {
    const diario = await this.diarioRepository.findById(accessContext, dto, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    return this.diarioRepository.findByIdSimple(accessContext, id, selection);
  }

  async diarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto> {
    const diario = await this.diarioRepository.findByIdSimple(accessContext, id, selection);

    if (!diario) {
      throw new NotFoundException();
    }

    return diario;
  }

  async diarioCreate(
    accessContext: AccessContext,
    dto: DiarioCreateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    await accessContext.ensurePermission("diario:create", { dto } as any);

    const dtoDiario = pick(dto, ["ativo"]);

    const diario = this.diarioRepository.create();

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    if (dto.ambientePadrao != null) {
      const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambientePadrao.id,
      });
      this.diarioRepository.merge(diario, {
        ambientePadrao: { id: ambientePadrao.id },
      });
    } else {
      this.diarioRepository.merge(diario, { ambientePadrao: null });
    }

    const calendarioLetivo =
      await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendarioLetivo.id,
      );
    this.diarioRepository.merge(diario, {
      calendarioLetivo: { id: calendarioLetivo.id },
    });

    const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(
      accessContext,
      dto.disciplina.id,
    );

    this.diarioRepository.merge(diario, { disciplina: { id: disciplina.id } });

    const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id);

    this.diarioRepository.merge(diario, { turma: { id: turma.id } });

    await this.diarioRepository.save(diario);

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  async diarioUpdate(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    const currentDiario = await this.diarioFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("diario:update", { dto }, dto.id);

    const dtoDiario = pick(dto, ["ativo", "ano", "etapa", "turma", "disciplina", "ambientePadrao"]);

    const diario = {
      id: currentDiario.id,
    } as DiarioEntity;

    this.diarioRepository.merge(diario, {
      ...dtoDiario,
    });

    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
          id: dto.ambientePadrao.id,
        });

        this.diarioRepository.merge(diario, {
          ambientePadrao: { id: ambientePadrao.id },
        });
      } else {
        this.diarioRepository.merge(diario, { ambientePadrao: null });
      }
    }

    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(
        accessContext,
        dto.disciplina.id,
      );

      this.diarioRepository.merge(diario, {
        disciplina: { id: disciplina.id },
      });
    }

    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id);
      this.diarioRepository.merge(diario, { turma: { id: turma.id } });
    }

    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo =
        await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
          accessContext,
          dto.calendarioLetivo.id,
        );
      this.diarioRepository.merge(diario, {
        calendarioLetivo: { id: calendarioLetivo.id },
      });
    }

    await this.diarioRepository.save(diario);

    return this.diarioFindByIdStrict(accessContext, { id: diario.id });
  }

  async diarioDeleteOneById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("diario:delete", { dto }, dto.id);

    const diario = await this.diarioFindByIdStrict(accessContext, dto);

    if (diario) {
      await this.diarioRepository.softDeleteById(diario.id);
    }

    return true;
  }
}
