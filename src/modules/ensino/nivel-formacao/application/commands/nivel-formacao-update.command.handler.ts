import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { NivelFormacaoUpdateCommand } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command";
import { INivelFormacaoUpdateCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import type { NivelFormacaoFindOneQuery } from "@/modules/ensino/nivel-formacao/domain/queries";
import { INivelFormacaoPermissionChecker } from "../../domain/authorization";
import type { NivelFormacaoFindOneQueryResult } from "../../domain/queries";
import { INivelFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class NivelFormacaoUpdateCommandHandlerImpl implements INivelFormacaoUpdateCommandHandler {
  constructor(
    @DeclareDependency(INivelFormacaoRepository)
    private readonly repository: INivelFormacaoRepository,
    @DeclareDependency(INivelFormacaoPermissionChecker)
    private readonly permissionChecker: INivelFormacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: NivelFormacaoFindOneQuery & NivelFormacaoUpdateCommand,
  ): Promise<NivelFormacaoFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, NivelFormacao.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = NivelFormacao.load(current);
    domain.update({ slug: dto.slug });
    await this.repository.update(current.id, domain);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, NivelFormacao.entityName, dto.id);

    return result;
  }
}
