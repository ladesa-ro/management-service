import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IOfertaFormacaoDeleteCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-delete.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import type { OfertaFormacaoFindOneQuery } from "@/modules/ensino/oferta-formacao/domain/queries";
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

  async execute(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, OfertaFormacao.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
