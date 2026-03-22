import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco";
import type { BlocoCreateCommand } from "@/modules/ambientes/bloco/domain/commands/bloco-create.command";
import { IBlocoCreateCommandHandler } from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import type { BlocoFindOneQueryResult } from "../../domain/queries";
import { IBlocoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class BlocoCreateCommandHandlerImpl implements IBlocoCreateCommandHandler {
  constructor(
    @DeclareDependency(IBlocoRepository)
    private readonly repository: IBlocoRepository,
    @DeclareDependency(IBlocoPermissionChecker)
    private readonly permissionChecker: IBlocoPermissionChecker,
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: AccessContext | null,
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
    const { id } = await this.repository.create({ ...domain, campus: { id: campus.id } });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Bloco.entityName, id);

    return result;
  }
}
