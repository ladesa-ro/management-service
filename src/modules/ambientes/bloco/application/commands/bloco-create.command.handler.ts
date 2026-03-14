import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { Bloco } from "@/modules/ambientes/bloco/domain/bloco.domain";
import {
  type IBlocoCreateCommand,
  IBlocoCreateCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands/bloco-create.command.handler.interface";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { IBlocoPermissionChecker } from "../../domain/authorization";
import { IBlocoRepository } from "../../domain/repositories";
import type { BlocoFindOneOutputDto } from "../dtos";

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

  async execute({ accessContext, dto }: IBlocoCreateCommand): Promise<BlocoFindOneOutputDto> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute({
      accessContext,
      dto: { id: dto.campus.id },
    });
    ensureExists(campus, Campus.entityName, dto.campus.id);
    const domain = Bloco.criar({
      nome: dto.nome,
      codigo: dto.codigo,
      campus: { id: campus.id },
    });
    const { id } = await this.repository.createFromDomain({ ...domain, campus: { id: campus.id } });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Bloco.entityName, id);

    return result;
  }
}
