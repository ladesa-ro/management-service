import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type ITurmaDisponibilidadeDeleteCommand,
  ITurmaDisponibilidadeDeleteCommandHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/commands/turma-disponibilidade-delete.command.handler.interface";
import {
  type ITurmaDisponibilidadeRepositoryPort,
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class TurmaDisponibilidadeDeleteCommandHandlerImpl
  implements ITurmaDisponibilidadeDeleteCommandHandler
{
  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: ITurmaDisponibilidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: ITurmaDisponibilidadeDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission(
      "turma_disponibilidade:delete",
      { dto },
      dto.id,
    );

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("TurmaDisponibilidade", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
