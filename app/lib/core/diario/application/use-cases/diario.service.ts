import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService } from "@/core/@shared";
import { AmbienteService } from "@/core/ambiente/application/use-cases/ambiente.service";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import type {
  DiarioCreateInput,
  DiarioFindOneInput,
  DiarioFindOneOutput,
  DiarioListInput,
  DiarioListOutput,
  DiarioUpdateInput,
} from "@/core/diario/application/dtos";
import {
  DIARIO_REPOSITORY_PORT,
  type IDiarioRepositoryPort,
  type IDiarioUseCasePort,
} from "@/core/diario/application/ports";
import { DisciplinaService } from "@/core/disciplina/application/use-cases/disciplina.service";
import { TurmaService } from "@/core/turma/application/use-cases/turma.service";
import type { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class DiarioService
  extends BaseCrudService<
    DiarioEntity,
    DiarioListInput,
    DiarioListOutput,
    DiarioFindOneInput,
    DiarioFindOneOutput,
    DiarioCreateInput,
    DiarioUpdateInput
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
    dto: DiarioCreateInput,
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
    dto: DiarioFindOneInput & DiarioUpdateInput,
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
