import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IModalidadeDeleteCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { ModalidadeFindOneQuery } from "@/modules/ensino/modalidade/domain/queries";
import { IModalidadePermissionChecker } from "../../domain/authorization";
import { IModalidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ModalidadeDeleteCommandHandlerImpl implements IModalidadeDeleteCommandHandler {
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @DeclareDependency(IModalidadePermissionChecker)
    private readonly permissionChecker: IModalidadePermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: ModalidadeFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, Modalidade.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
