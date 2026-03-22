import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
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
    accessContext: AccessContext | null,
    dto: BlocoFindOneQuery & BlocoUpdateCommand,
  ): Promise<BlocoFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Bloco.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Bloco.load(current);
    domain.update({ nome: dto.nome, codigo: dto.codigo });
    await this.repository.update(current.id, domain);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Bloco.entityName, dto.id);

    return result;
  }
}
