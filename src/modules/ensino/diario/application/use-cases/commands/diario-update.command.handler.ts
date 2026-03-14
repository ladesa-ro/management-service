import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import {
  type IDiarioUpdateCommand,
  IDiarioUpdateCommandHandler,
} from "@/modules/ensino/diario/domain/commands/diario-update.command.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import type { IDiario } from "@/modules/ensino/diario/domain/diario.types";
import { DisciplinaService } from "@/modules/ensino/disciplina/application/use-cases/disciplina.service";
import { TurmaService } from "@/modules/ensino/turma/application/use-cases/turma.service";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import type { DiarioFindOneOutputDto } from "../../dtos";
import { DIARIO_REPOSITORY_PORT, type IDiarioRepositoryPort } from "../../ports";

@Injectable()
export class DiarioUpdateCommandHandlerImpl implements IDiarioUpdateCommandHandler {
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
        const ambientePadrao = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambientePadrao.id,
        });
        updateData.ambientePadrao = { id: ambientePadrao.id };
      } else {
        updateData.ambientePadrao = null;
      }
    }
    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.findByIdSimpleStrict(
        accessContext,
        dto.disciplina.id,
      );
      updateData.disciplina = { id: disciplina.id };
    }
    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
      updateData.turma = { id: turma.id };
    }
    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendarioLetivo.id,
      );
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
