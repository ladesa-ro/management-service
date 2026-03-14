import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import { CursoService } from "@/modules/ensino/curso";
import {
  type ITurmaUpdateCommand,
  ITurmaUpdateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import type { ITurma } from "@/modules/ensino/turma/domain/turma.types";
import type { TurmaFindOneOutputDto } from "../../dtos";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class TurmaUpdateCommandHandlerImpl implements ITurmaUpdateCommandHandler {
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly ambienteService: AmbienteService,
    private readonly cursoService: CursoService,
  ) {}

  async execute({ accessContext, dto }: ITurmaUpdateCommand): Promise<TurmaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Turma", dto.id);
    }

    await this.authorizationService.ensurePermission("turma:update", { dto }, dto.id);

    const domain = Turma.fromData(current);
    domain.atualizar({ periodo: dto.periodo });
    const updateData: Partial<PersistInput<ITurma>> = { periodo: domain.periodo };
    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambientePadraoAula.id,
        });
        updateData.ambientePadraoAula = { id: ambientePadraoAula.id };
      } else {
        updateData.ambientePadraoAula = null;
      }
    }
    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoService.findByIdSimpleStrict(accessContext, dto.curso.id);
      updateData.curso = { id: curso.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Turma", dto.id);
    }

    return result;
  }
}
