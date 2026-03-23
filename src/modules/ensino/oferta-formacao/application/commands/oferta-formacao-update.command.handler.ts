import { has } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext, PersistInput } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import type { OfertaFormacaoUpdateCommand } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command";
import { IOfertaFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import type { OfertaFormacaoFindOneQuery } from "@/modules/ensino/oferta-formacao/domain/queries";
import { IOfertaFormacaoPermissionChecker } from "../../domain/authorization";
import type { OfertaFormacaoFindOneQueryResult } from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoUpdateCommandHandlerImpl implements IOfertaFormacaoUpdateCommandHandler {
  constructor(
    @DeclareDependency(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @DeclareDependency(IOfertaFormacaoPermissionChecker)
    private readonly permissionChecker: IOfertaFormacaoPermissionChecker,
    @DeclareDependency(IModalidadeFindOneQueryHandler)
    private readonly modalidadeFindOneHandler: IModalidadeFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand,
  ): Promise<OfertaFormacaoFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, OfertaFormacao.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = OfertaFormacao.load(current);
    domain.update({
      nome: dto.nome,
      slug: dto.slug,
      duracaoPeriodoEmMeses: dto.duracaoPeriodoEmMeses,
    });
    const updateData: Partial<PersistInput<IOfertaFormacao>> = { ...domain };
    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      if (dto.modalidade) {
        const modalidade = await this.modalidadeFindOneHandler.execute(accessContext, {
          id: dto.modalidade.id,
        });
        ensureExists(modalidade, Modalidade.entityName, dto.modalidade.id);
        updateData.modalidade = { id: modalidade.id };
      } else {
        updateData.modalidade = null;
      }
    }
    await this.repository.update(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, OfertaFormacao.entityName, dto.id);

    return result;
  }
}
