import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { INivelFormacaoDeleteCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type { NivelFormacaoFindOneQuery } from "@/modules/ensino/nivel-formacao/domain/queries";
import { INivelFormacaoPermissionChecker } from "../../domain/authorization";
import { INivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class NivelFormacaoDeleteCommandHandlerImpl implements INivelFormacaoDeleteCommandHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @DeclareDependency(INivelFormacaoPermissionChecker)
    private readonly permissionChecker: INivelFormacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, NivelFormacao.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
