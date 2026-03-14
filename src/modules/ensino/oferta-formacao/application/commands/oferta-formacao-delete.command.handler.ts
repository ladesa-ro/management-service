import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type IOfertaFormacaoDeleteCommand,
  IOfertaFormacaoDeleteCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoPermissionChecker } from "../../domain/authorization";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoDeleteCommandHandlerImpl implements IOfertaFormacaoDeleteCommandHandler {
  constructor(
    @DeclareDependency(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @DeclareDependency(IOfertaFormacaoPermissionChecker)
    private readonly permissionChecker: IOfertaFormacaoPermissionChecker,
  ) {}

  async execute({ accessContext, dto }: IOfertaFormacaoDeleteCommand): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, OfertaFormacao.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
