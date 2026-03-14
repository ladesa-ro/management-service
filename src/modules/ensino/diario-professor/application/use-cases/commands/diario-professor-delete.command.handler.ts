import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IDiarioProfessorDeleteCommand,
  IDiarioProfessorDeleteCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-delete.command.handler.interface";
import { DIARIO_PROFESSOR_REPOSITORY_PORT, type IDiarioProfessorRepositoryPort } from "../../ports";

@Injectable()
export class DiarioProfessorDeleteCommandHandlerImpl
  implements IDiarioProfessorDeleteCommandHandler
{
  constructor(
    @Inject(DIARIO_PROFESSOR_REPOSITORY_PORT)
    private readonly repository: IDiarioProfessorRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
  ) {}

  async execute({ accessContext, dto }: IDiarioProfessorDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("diario_professor:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    if (!entity) {
      throw new ResourceNotFoundError("DiarioProfessor", dto.id);
    }

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
