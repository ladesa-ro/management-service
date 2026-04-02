import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import type { BlocoCreateCommand } from "@/modules/ambientes/bloco/domain/commands/bloco-create.command";
import { IBlocoCreateCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import type { BlocoFindOneQueryResult } from "../../domain/queries";
import { IBlocoRepository } from "../../domain/repositories";

@Impl()
export class BlocoCreateCommandHandlerImpl implements IBlocoCreateCommandHandler {
  constructor(
    @Dep(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @Dep(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
    @Dep(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: BlocoCreateCommand,
  ): Promise<BlocoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
    ensureExists(campus, Campus.entityName, dto.campus.id);

    const domain = Bloco.create({
      nome: dto.nome,
      codigo: dto.codigo,
      campus: { id: campus.id },
    });

    domain.campus = { id: campus.id };

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, Bloco.entityName, domain.id);

    return result;
  }
}
