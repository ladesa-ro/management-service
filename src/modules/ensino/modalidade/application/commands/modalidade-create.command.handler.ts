import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { ModalidadeCreateCommand } from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command";
import { IModalidadeCreateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-create.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
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
    accessContext: IAccessContext | null,
    dto: ModalidadeCreateCommand,
  ): Promise<ModalidadeFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = Modalidade.create({ nome: dto.nome, slug: dto.slug });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });

    ensureExists(result, Modalidade.entityName, domain.id);

    return result;
  }
}
