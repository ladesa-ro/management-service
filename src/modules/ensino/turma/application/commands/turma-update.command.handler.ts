import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists, IAuthorizationService, type PersistInput } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente.domain";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import {
  type ITurmaUpdateCommand,
  ITurmaUpdateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-update.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import type { ITurma } from "@/modules/ensino/turma/domain/turma.types";
import { ITurmaRepository } from "../../domain/repositories";
import type { TurmaFindOneOutputDto } from "../dtos";

@Injectable()
export class TurmaUpdateCommandHandlerImpl implements ITurmaUpdateCommandHandler {
  constructor(
    @Inject(ITurmaRepository)
    private readonly repository: ITurmaRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IAmbienteFindOneQueryHandler)
    private readonly ambienteFindOneHandler: IAmbienteFindOneQueryHandler,
    @Inject(ICursoFindOneQueryHandler)
    private readonly cursoFindOneHandler: ICursoFindOneQueryHandler,
  ) {}

  async execute({ accessContext, dto }: ITurmaUpdateCommand): Promise<TurmaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Turma.entityName, dto.id);

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
        ensureExists(ambientePadraoAula, Ambiente.entityName, dto.ambientePadraoAula.id);
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
      ensureExists(curso, Curso.entityName, dto.curso.id);
      updateData.curso = { id: curso.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Turma.entityName, dto.id);

    return result;
  }
}
