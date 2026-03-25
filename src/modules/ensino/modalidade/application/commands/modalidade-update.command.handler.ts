import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { ModalidadeUpdateCommand } from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command";
import { IModalidadeUpdateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { ModalidadeFindOneQuery } from "@/modules/ensino/modalidade/domain/queries";
import { IModalidadePermissionChecker } from "../../domain/authorization";
import type { ModalidadeFindOneQueryResult } from "../../domain/queries";
import { IModalidadeRepository } from "../../domain/repositories";

@DeclareImplementation()
export class ModalidadeUpdateCommandHandlerImpl implements IModalidadeUpdateCommandHandler {
  constructor(
    @DeclareDependency(IModalidadeRepository)
    private readonly repository: IModalidadeRepository,
    @DeclareDependency(IModalidadePermissionChecker)
    private readonly permissionChecker: IModalidadePermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: ModalidadeFindOneQuery & ModalidadeUpdateCommand,
  ): Promise<ModalidadeFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);

    ensureExists(domain, Modalidade.entityName, dto.id);
    ensureActiveEntity(domain, Modalidade.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    domain.update({ nome: dto.nome, slug: dto.slug });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });

    ensureExists(result, Modalidade.entityName, dto.id);

    return result;
  }
}
