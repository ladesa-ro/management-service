import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade.domain";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import type { OfertaFormacaoUpdateCommand } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command";
import { IOfertaFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.types";
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
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand,
  ): Promise<OfertaFormacaoFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, OfertaFormacao.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = OfertaFormacao.fromData(current);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    const updateData: Partial<PersistInput<IOfertaFormacao>> = {
      nome: domain.nome,
      slug: domain.slug,
    };
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
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, OfertaFormacao.entityName, dto.id);

    return result;
  }
}
