import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import {
  type IDiarioProfessorDeleteCommand,
  IDiarioProfessorDeleteCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-delete.command.handler.interface";
import { IDiarioProfessorRepository } from "../../../domain/repositories";

@Injectable()
export class DiarioProfessorDeleteCommandHandlerImpl
  implements IDiarioProfessorDeleteCommandHandler
{
  constructor(
    @Inject(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
  ) {}

  async execute({ accessContext, dto }: IDiarioProfessorDeleteCommand): Promise<boolean> {
    await this.authorizationService.ensurePermission("diario_professor:delete", { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, "DiarioProfessor", dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
