import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import {
  type IDiarioUpdateCommand,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import type { IDiario } from "@/modules/ensino/diario/domain/diario.types";
import { IDisciplinaFindOneQueryHandler } from "@/modules/ensino/disciplina/domain/queries/disciplina-find-one.query.handler.interface";
import { ITurmaFindOneQueryHandler } from "@/modules/ensino/turma/domain/queries/turma-find-one.query.handler.interface";
import { ICalendarioLetivoFindOneQueryHandler } from "@/modules/horarios/calendario-letivo/domain/queries/calendario-letivo-find-one.query.handler.interface";
import { DIARIO_REPOSITORY_PORT, type IDiarioRepositoryPort } from "../../../domain/repositories";
import type { DiarioFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioUpdateCommandHandlerImpl implements IDiarioUpdateCommandHandler {
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

  async execute({ accessContext, dto }: IDiarioUpdateCommand): Promise<DiarioFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Diario", dto.id);
    }

    await this.authorizationService.ensurePermission("diario:update", { dto }, dto.id);

    const domain = Diario.fromData(current);
    domain.atualizar({ ativo: dto.ativo });
    const updateData: Partial<PersistInput<IDiario>> = { ativo: domain.ativo };
    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteFindOneHandler.execute({
          accessContext,
          dto: { id: dto.ambientePadrao.id },
        });
        if (!ambientePadrao) {
          throw new ResourceNotFoundError("Ambiente", dto.ambientePadrao.id);
        }
        updateData.ambientePadrao = { id: ambientePadrao.id };
      } else {
        updateData.ambientePadrao = null;
      }
    }
    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaFindOneHandler.execute({
        accessContext,
        dto: { id: dto.disciplina.id },
      });
      if (!disciplina) {
        throw new ResourceNotFoundError("Disciplina", dto.disciplina.id);
      }
      updateData.disciplina = { id: disciplina.id };
    }
    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaFindOneHandler.execute({
        accessContext,
        dto: { id: dto.turma.id },
      });
      if (!turma) {
        throw new ResourceNotFoundError("Turma", dto.turma.id);
      }
      updateData.turma = { id: turma.id };
    }
    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.calendarioLetivo.id },
      });
      if (!calendarioLetivo) {
        throw new ResourceNotFoundError("CalendarioLetivo", dto.calendarioLetivo.id);
      }
      updateData.calendarioLetivo = { id: calendarioLetivo.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Diario", dto.id);
    }

    return result;
  }
}
