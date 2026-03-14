import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  type IDiarioCreateCommand,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { DisciplinaService } from "@/modules/ensino/disciplina/application/use-cases/disciplina.service";
import { TurmaService } from "@/modules/ensino/turma/application/use-cases/turma.service";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import type { DiarioFindOneOutputDto } from "../../dtos";
import { DIARIO_REPOSITORY_PORT, type IDiarioRepositoryPort } from "../../ports";

@Injectable()
export class DiarioCreateCommandHandlerImpl implements IDiarioCreateCommandHandler {
  constructor(
    @Inject(DIARIO_REPOSITORY_PORT)
    private readonly repository: IDiarioRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
    private readonly turmaService: TurmaService,
    private readonly disciplinaService: DisciplinaService,
    private readonly ambienteService: AmbienteService,
  ) {}

  async execute({ accessContext, dto }: IDiarioCreateCommand): Promise<DiarioFindOneOutputDto> {
    await this.authorizationService.ensurePermission("diario:create", { dto });

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
    const { id } = await this.repository.createFromDomain({
      ...domain,
      calendarioLetivo: { id: calendarioLetivo.id },
      turma: { id: turma.id },
      disciplina: { id: disciplina.id },
      ambientePadrao: ambientePadraoRef,
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Diario", id);
    }

    return result;
  }
}
