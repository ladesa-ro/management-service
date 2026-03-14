import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import {
  type INivelFormacaoCreateCommand,
  INivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
import { INivelFormacaoPermissionChecker } from "../../domain/authorization";
import type { NivelFormacaoFindOneQueryResult } from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class NivelFormacaoCreateCommandHandlerImpl implements INivelFormacaoCreateCommandHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @DeclareDependency(INivelFormacaoPermissionChecker)
    private readonly permissionChecker: INivelFormacaoPermissionChecker,
  ) {}

  async execute({
    accessContext,
    dto,
  }: INivelFormacaoCreateCommand): Promise<NivelFormacaoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = NivelFormacao.criar({ slug: dto.slug });
    const { id } = await this.repository.createFromDomain({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, NivelFormacao.entityName, id);

    return result;
  }
}
