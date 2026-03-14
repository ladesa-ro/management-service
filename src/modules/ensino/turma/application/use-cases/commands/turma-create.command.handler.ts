import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import { CursoService } from "@/modules/ensino/curso";
import {
  type ITurmaCreateCommand,
  ITurmaCreateCommandHandler,
} from "@/modules/ensino/turma/domain/commands/turma-create.command.handler.interface";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import type { TurmaFindOneOutputDto } from "../../dtos";
import { type ITurmaRepositoryPort, TURMA_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class TurmaCreateCommandHandlerImpl implements ITurmaCreateCommandHandler {
  constructor(
    @Inject(TURMA_REPOSITORY_PORT)
    private readonly repository: ITurmaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly ambienteService: AmbienteService,
    private readonly cursoService: CursoService,
  ) {}

  async execute({ accessContext, dto }: ITurmaCreateCommand): Promise<TurmaFindOneOutputDto> {
    await this.authorizationService.ensurePermission("turma:create", { dto });

    const curso = await this.cursoService.findByIdSimpleStrict(accessContext, dto.curso.id);
    let ambientePadraoAulaRef: { id: string } | null = null;
    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambientePadraoAula.id,
      });
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
