import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  type IDiarioCreateCommand,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { Disciplina } from "@/modules/ensino/disciplina/domain/disciplina.domain";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import { CalendarioLetivo } from "@/modules/horarios/calendario-letivo/domain/calendario-letivo.domain";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { IDiarioPermissionChecker } from "../../domain/authorization";
import { IDiarioRepository } from "../../domain/repositories";
import type { DiarioFindOneOutputDto } from "../dtos";

@DeclareImplementation()
export class DiarioCreateCommandHandlerImpl implements IDiarioCreateCommandHandler {
  constructor(
    @DeclareDependency(IDiarioRepository)
    private readonly repository: IDiarioRepository,
    @DeclareDependency(IDiarioPermissionChecker)
    private readonly permissionChecker: IDiarioPermissionChecker,
    @DeclareDependency(ICalendarioLetivoFindOneQueryHandler)
    private readonly calendarioLetivoFindOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @DeclareDependency(ITurmaFindOneQueryHandler)
    private readonly turmaFindOneHandler: ITurmaFindOneQueryHandler,
    @DeclareDependency(IDisciplinaFindOneQueryHandler)
    private readonly disciplinaFindOneHandler: IDisciplinaFindOneQueryHandler,
    @DeclareDependency(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
  ) {}

  async execute({ accessContext, dto }: IDiarioCreateCommand): Promise<DiarioFindOneOutputDto> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    let ambientePadraoRef: { id: string } | null = null;
    if (dto.ambientePadrao != null) {
      const ambientePadrao = await this.ambienteFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ambientePadrao.id },
      });
      ensureExists(ambientePadrao, Ambiente.entityName, dto.ambientePadrao.id);
      ambientePadraoRef = { id: ambientePadrao.id };
    }

    const calendarioLetivo = await this.calendarioLetivoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.calendarioLetivo.id },
    });
    ensureExists(calendarioLetivo, CalendarioLetivo.entityName, dto.calendarioLetivo.id);

    const disciplina = await this.disciplinaFindOneHandler.execute({
      accessContext,
      dto: { id: dto.disciplina.id },
    });
    ensureExists(disciplina, Disciplina.entityName, dto.disciplina.id);

    const turma = await this.turmaFindOneHandler.execute({
      accessContext,
      dto: { id: dto.turma.id },
    });
    ensureExists(turma, Turma.entityName, dto.turma.id);

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

    ensureExists(result, Diario.entityName, id);

    return result;
  }
}
