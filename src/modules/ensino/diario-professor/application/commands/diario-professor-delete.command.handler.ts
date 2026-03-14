import { Inject, Injectable } from "@nestjs/common";
import { ensureExists } from "@/modules/@shared";
import {
  type IDiarioProfessorDeleteCommand,
  IDiarioProfessorDeleteCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-delete.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import { IDiarioProfessorPermissionChecker } from "../../domain/authorization";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@Injectable()
export class DiarioProfessorDeleteCommandHandlerImpl
  implements IDiarioProfessorDeleteCommandHandler
{
  constructor(
    @Inject(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
    @Inject(IDiarioProfessorPermissionChecker)
    private readonly permissionChecker: IDiarioProfessorPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: IDiarioProfessorDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, DiarioProfessor.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
