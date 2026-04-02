import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { INivelFormacaoDeleteCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-delete.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type { NivelFormacaoFindOneQuery } from "@/modules/ensino/nivel-formacao/domain/queries";
import { INivelFormacaoPermissionChecker } from "../../domain/authorization";
import { INivelFormacaoRepository } from "../../domain/repositories";

@Impl()
export class NivelFormacaoDeleteCommandHandlerImpl implements INivelFormacaoDeleteCommandHandler {
  constructor(
    @Dep(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @Dep(INivelFormacaoPermissionChecker)
    private readonly permissionChecker: INivelFormacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, NivelFormacao.entityName, dto.id);
    ensureActiveEntity(domain, NivelFormacao.entityName, dto.id);

    await this.repository.softDeleteById(domain.id);

    return true;
  }
}
