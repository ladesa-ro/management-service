import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import type { OfertaFormacaoCreateCommand } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command";
import { IOfertaFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import type { AccessContext } from "@/server/access-context";
import { IOfertaFormacaoPermissionChecker } from "../../domain/authorization";
import type { OfertaFormacaoFindOneQueryResult } from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class OfertaFormacaoCreateCommandHandlerImpl implements IOfertaFormacaoCreateCommandHandler {
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
    dto: OfertaFormacaoCreateCommand,
  ): Promise<OfertaFormacaoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    let modalidadeRef: { id: string } | undefined;
    if (dto.modalidade) {
      const modalidade = await this.modalidadeFindOneHandler.execute(accessContext, {
        id: dto.modalidade.id,
      });
      ensureExists(modalidade, Modalidade.entityName, dto.modalidade.id);
      modalidadeRef = { id: modalidade.id };
    }
    const domain = OfertaFormacao.create({
      nome: dto.nome,
      slug: dto.slug,
      modalidade: modalidadeRef,
    });
    const { id } = await this.repository.create({
      ...domain,
      ...(modalidadeRef ? { modalidade: modalidadeRef } : {}),
      ...(dto.duracaoPeriodo !== undefined ? { duracaoPeriodo: dto.duracaoPeriodo } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, OfertaFormacao.entityName, id);

    return result;
  }
}
