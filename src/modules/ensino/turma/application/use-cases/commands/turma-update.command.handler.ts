import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import {
  type ITurmaUpdateCommand,
  ITurmaUpdateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import type { ITurma } from "@/modules/ensino/turma/domain/turma.types";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../../domain/repositories";
import type { TurmaFindOneOutputDto } from "../../dtos";

@Injectable()
export class TurmaUpdateCommandHandlerImpl implements ITurmaUpdateCommandHandler {
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
    @Inject(ICursoFindOneQueryHandler)
    private readonly cursoFindOneHandler: ICursoFindOneQueryHandler,
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
        const ambientePadraoAula = await this.ambienteFindOneHandler.execute({
          accessContext,
          dto: { id: dto.ambientePadraoAula.id },
        });
        if (!ambientePadraoAula) {
          throw new ResourceNotFoundError("Ambiente", dto.ambientePadraoAula.id);
        }
        updateData.ambientePadraoAula = { id: ambientePadraoAula.id };
      } else {
        updateData.ambientePadraoAula = null;
      }
    }
    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.curso.id },
      });
      if (!curso) {
        throw new ResourceNotFoundError("Curso", dto.curso.id);
      }
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
