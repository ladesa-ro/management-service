import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type IModalidadeUpdateCommand,
  IModalidadeUpdateCommandHandler,
} from "@/modules/ensino/modalidade/domain/commands/modalidade-update.command.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
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

  async execute({
    accessContext,
    dto,
  }: IModalidadeUpdateCommand): Promise<ModalidadeFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Modalidade.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Modalidade.fromData(current);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    await this.repository.updateFromDomain(current.id, { nome: domain.nome, slug: domain.slug });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Modalidade.entityName, dto.id);

    return result;
  }
}
