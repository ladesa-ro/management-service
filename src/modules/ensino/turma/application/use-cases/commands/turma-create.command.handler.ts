import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IAmbienteFindOneQueryHandler } from "@/modules/ambientes/ambiente/domain/queries/ambiente-find-one.query.handler.interface";
import { ICursoFindOneQueryHandler } from "@/modules/ensino/curso/domain/queries/curso-find-one.query.handler.interface";
import {
  type ITurmaCreateCommand,
  ITurmaCreateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../../domain/repositories";
import type { TurmaFindOneOutputDto } from "../../dtos";

@Injectable()
export class TurmaCreateCommandHandlerImpl implements ITurmaCreateCommandHandler {
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

  async execute({ accessContext, dto }: ITurmaCreateCommand): Promise<TurmaFindOneOutputDto> {
    await this.authorizationService.ensurePermission("turma:create", { dto });

    const curso = await this.cursoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.curso.id },
    });
    if (!curso) {
      throw new ResourceNotFoundError("Curso", dto.curso.id);
    }
    let ambientePadraoAulaRef: { id: string } | null = null;
    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ambientePadraoAula.id },
      });
      if (!ambientePadraoAula) {
        throw new ResourceNotFoundError("Ambiente", dto.ambientePadraoAula.id);
      }
      ambientePadraoAulaRef = { id: ambientePadraoAula.id };
    }
    const domain = Turma.criar({
      periodo: dto.periodo,
      curso: { id: curso.id },
      ambientePadraoAula: ambientePadraoAulaRef,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      curso: { id: curso.id },
      ambientePadraoAula: ambientePadraoAulaRef,
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Turma", id);
    }

    return result;
  }
}
