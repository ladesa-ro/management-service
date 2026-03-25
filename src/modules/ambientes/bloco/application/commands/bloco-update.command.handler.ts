import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import type { BlocoUpdateCommand } from "@/modules/ambientes/bloco/domain/commands/bloco-update.command";
import { IBlocoUpdateCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-update.command.handler.interface";
import type { BlocoFindOneQuery } from "@/modules/ambientes/bloco/domain/queries";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import type { BlocoFindOneQueryResult } from "../../domain/queries";
import { IBlocoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class BlocoUpdateCommandHandlerImpl implements IBlocoUpdateCommandHandler {
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @DeclareDependency(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: BlocoFindOneQuery & BlocoUpdateCommand,
  ): Promise<BlocoFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Bloco.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    domain.update({ nome: dto.nome, codigo: dto.codigo });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, Bloco.entityName, dto.id);

    return result;
  }
}
