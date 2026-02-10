import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambiente/application/use-cases/ambiente.service";
import { CalendarioLetivoService } from "@/modules/calendario-letivo";
import { Diario, type IDiario } from "@/modules/diario";
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
import { DisciplinaService } from "@/modules/disciplina/application/use-cases/disciplina.service";
import { TurmaService } from "@/modules/turma/application/use-cases/turma.service";

@Injectable()
export class DiarioService
  extends BaseCrudService<
    IDiario,
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

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: DiarioCreateInputDto,
  ): Promise<Partial<PersistInput<IDiario>>> {
    let ambientePadraoRef: { id: string } | null = null;
    if (dto.ambientePadrao != null) {
      const ambientePadrao = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambientePadrao.id,
      });
      ambientePadraoRef = { id: ambientePadrao.id };
    }

    const calendarioLetivo = await this.calendarioLetivoService.findByIdSimpleStrict(
      accessContext,
      dto.calendarioLetivo.id,
    );
    const disciplina = await this.disciplinaService.findByIdSimpleStrict(
      accessContext,
      dto.disciplina.id,
    );
    const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);

    const domain = Diario.criar({
      ativo: dto.ativo,
      calendarioLetivo: { id: calendarioLetivo.id },
      turma: { id: turma.id },
      disciplina: { id: disciplina.id },
      ambientePadrao: ambientePadraoRef,
    });
    return {
      ...domain,
      calendarioLetivo: { id: calendarioLetivo.id },
      turma: { id: turma.id },
      disciplina: { id: disciplina.id },
      ambientePadrao: ambientePadraoRef,
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
    current: DiarioFindOneOutputDto,
  ): Promise<Partial<PersistInput<IDiario>>> {
    const domain = Diario.fromData(current);
    domain.atualizar({ ativo: dto.ativo });
    const result: Partial<PersistInput<IDiario>> = { ativo: domain.ativo };

    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambientePadrao.id,
        });
        result.ambientePadrao = { id: ambientePadrao.id };
      } else {
        result.ambientePadrao = null;
      }
    }

    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.findByIdSimpleStrict(
        accessContext,
        dto.disciplina.id,
      );
      result.disciplina = { id: disciplina.id };
    }

    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
      result.turma = { id: turma.id };
    }

    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendarioLetivo.id,
      );
      result.calendarioLetivo = { id: calendarioLetivo.id };
    }

    return result;
  }
}
