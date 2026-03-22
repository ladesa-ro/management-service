import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { NivelFormacaoCreateCommand } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command";
import { INivelFormacaoCreateCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-create.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
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

  async execute(
    accessContext: IAccessContext | null,
    dto: NivelFormacaoCreateCommand,
  ): Promise<NivelFormacaoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const domain = NivelFormacao.create({ slug: dto.slug });
    const { id } = await this.repository.create({ ...domain });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, NivelFormacao.entityName, id);

    return result;
  }
}
