import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { ModalidadeUpdateCommand } from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command";
import { IModalidadeUpdateCommandHandler } from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import type { ModalidadeFindOneQuery } from "@/modules/ensino/modalidade/domain/queries";
import type { AccessContext } from "@/server/access-context";
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
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneQuery & ModalidadeUpdateCommand,
  ): Promise<ModalidadeFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Modalidade.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Modalidade.load(current);
    domain.update({ nome: dto.nome, slug: dto.slug });
    await this.repository.update(current.id, domain);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Modalidade.entityName, dto.id);

    return result;
  }
}
