import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import type { NivelFormacaoUpdateCommand } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command";
import { INivelFormacaoUpdateCommandHandler } from "@/modules/ensino/nivel-formacao/domain/commands/nivel-formacao-update.command.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao.domain";
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

    const domain = NivelFormacao.fromData(current);
    domain.atualizar({ slug: dto.slug });
    await this.repository.updateFromDomain(current.id, { slug: domain.slug });

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, NivelFormacao.entityName, dto.id);

    return result;
  }
}
