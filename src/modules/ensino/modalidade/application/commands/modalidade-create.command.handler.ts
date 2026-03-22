import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { ModalidadeCreateCommand } from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command";
import { IModalidadeCreateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { AccessContext } from "@/server/access-context";
import { IModalidadePermissionChecker } from "../../domain/authorization";
import type { ModalidadeFindOneQueryResult } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ModalidadeCreateCommandHandlerImpl implements IModalidadeCreateCommandHandler {
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @DeclareDependency(IModalidadePermissionChecker)
    private readonly permissionChecker: IModalidadePermissionChecker,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: ModalidadeCreateCommand,
  ): Promise<ModalidadeFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = Modalidade.create({ nome: dto.nome, slug: dto.slug });
    const { id } = await this.repository.create({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Modalidade.entityName, id);

    return result;
  }
}
