import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambiente/application/use-cases/ambiente.service";
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import type {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "@/modules/diario/application/dtos";
import {
  DIARIO_REPOSITORY_PORT,
  type IDiarioRepositoryPort,
  type IDiarioUseCasePort,
} from "@/modules/diario/application/ports";
import type { DiarioEntity } from "@/modules/diario/infrastructure/persistence/typeorm";
import { DisciplinaService } from "@/modules/disciplina/application/use-cases/disciplina.service";
import { TurmaService } from "@/modules/turma/application/use-cases/turma.service";

@Injectable()
export class DiarioService
  extends BaseCrudService<
    DiarioEntity,
    DiarioListInputDto,
    DiarioListOutputDto,
    DiarioFindOneInputDto,
    DiarioFindOneOutputDto,
    DiarioCreateInputDto,
    DiarioUpdateInputDto
  >
  implements IDiarioUseCasePort
{
  protected readonly resourceName = "Diario";
  protected readonly createAction = "diario:create";
  protected readonly updateAction = "diario:update";
  protected readonly deleteAction = "diario:delete";
  protected readonly createFields = ["ativo"] as const;
  protected readonly updateFields = ["ativo"] as const;

  constructor(
    @Inject(DIARIO_REPOSITORY_PORT)
    protected readonly repository: IDiarioRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
    private readonly turmaService: TurmaService,
    private readonly disciplinaService: DisciplinaService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiarioEntity,
    dto: DiarioCreateInputDto,
  ): Promise<void> {
    if (dto.ambientePadrao != null) {
      const ambientePadrao = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambientePadrao.id,
      });
      this.repository.merge(entity, { ambientePadrao: { id: ambientePadrao.id } });
    } else {
      this.repository.merge(entity, { ambientePadrao: null });
    }

    const calendarioLetivo = await this.calendarioLetivoService.findByIdSimpleStrict(
      accessContext,
      dto.calendarioLetivo.id,
    );
    this.repository.merge(entity, { calendarioLetivo: { id: calendarioLetivo.id } });

    const disciplina = await this.disciplinaService.findByIdSimpleStrict(
      accessContext,
      dto.disciplina.id,
    );
    this.repository.merge(entity, { disciplina: { id: disciplina.id } });

    const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
    this.repository.merge(entity, { turma: { id: turma.id } });
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: DiarioEntity,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambientePadrao.id,
        });
        this.repository.merge(entity, { ambientePadrao: { id: ambientePadrao.id } });
      } else {
        this.repository.merge(entity, { ambientePadrao: null });
      }
    }

    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.findByIdSimpleStrict(
        accessContext,
        dto.disciplina.id,
      );
      this.repository.merge(entity, { disciplina: { id: disciplina.id } });
    }

    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
      this.repository.merge(entity, { turma: { id: turma.id } });
    }

    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendarioLetivo.id,
      );
      this.repository.merge(entity, { calendarioLetivo: { id: calendarioLetivo.id } });
    }
  }
}
