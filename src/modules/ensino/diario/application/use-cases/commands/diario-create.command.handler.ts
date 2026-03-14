import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  type IDiarioCreateCommand,
  IDiarioCreateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-create.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { DIARIO_REPOSITORY_PORT, type IDiarioRepositoryPort } from "../../../domain/repositories";
import type { DiarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioCreateCommandHandlerImpl implements IDiarioCreateCommandHandler {
  constructor(
    @Inject(DIARIO_REPOSITORY_PORT)
    private readonly repository: IDiarioRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(ICalendarioLetivoFindOneQueryHandler)
    private readonly calendarioLetivoFindOneHandler: ICalendarioLetivoFindOneQueryHandler,
    @Inject(ITurmaFindOneQueryHandler)
    private readonly turmaFindOneHandler: ITurmaFindOneQueryHandler,
    @Inject(IDisciplinaFindOneQueryHandler)
    private readonly disciplinaFindOneHandler: IDisciplinaFindOneQueryHandler,
    @Inject(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
  ) {}

  async execute({ accessContext, dto }: IDiarioCreateCommand): Promise<DiarioFindOneOutputDto> {
    await this.authorizationService.ensurePermission("diario:create", { dto });

    let ambientePadraoRef: { id: string } | null = null;
    if (dto.ambientePadrao != null) {
      const ambientePadrao = await this.ambienteFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ambientePadrao.id },
      });
      if (!ambientePadrao) {
        throw new ResourceNotFoundError("Ambiente", dto.ambientePadrao.id);
      }
      ambientePadraoRef = { id: ambientePadrao.id };
    }

    const calendarioLetivo = await this.calendarioLetivoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.calendarioLetivo.id },
    });
    if (!calendarioLetivo) {
      throw new ResourceNotFoundError("CalendarioLetivo", dto.calendarioLetivo.id);
    }

    const disciplina = await this.disciplinaFindOneHandler.execute({
      accessContext,
      dto: { id: dto.disciplina.id },
    });
    if (!disciplina) {
      throw new ResourceNotFoundError("Disciplina", dto.disciplina.id);
    }

    const turma = await this.turmaFindOneHandler.execute({
      accessContext,
      dto: { id: dto.turma.id },
    });
    if (!turma) {
      throw new ResourceNotFoundError("Turma", dto.turma.id);
    }

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
