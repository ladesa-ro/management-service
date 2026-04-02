import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IModalidadeDeleteCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-delete.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { ModalidadeFindOneQuery } from "@/modules/ensino/modalidade/domain/queries";
import { IModalidadePermissionChecker } from "../../domain/authorization";
import { IModalidadeRepository } from "../../domain/repositories";

@Impl()
export class ModalidadeDeleteCommandHandlerImpl implements IModalidadeDeleteCommandHandler {
  constructor(
    @Dep(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @Dep(IModalidadePermissionChecker)
    private readonly permissionChecker: IModalidadePermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: ModalidadeFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const domain = await this.repository.loadById(accessContext, dto.id);

    ensureExists(domain, Modalidade.entityName, dto.id);
    ensureActiveEntity(domain, Modalidade.entityName, dto.id);

    await this.repository.softDeleteById(domain.id);

    return true;
  }
}
