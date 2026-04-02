import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import type { OfertaFormacaoCreateCommand } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command";
import { IOfertaFormacaoCreateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoPermissionChecker } from "../../domain/authorization";
import type { OfertaFormacaoFindOneQueryResult } from "../../domain/queries";
import { IOfertaFormacaoRepository } from "../../domain/repositories";

@Impl()
export class OfertaFormacaoCreateCommandHandlerImpl implements IOfertaFormacaoCreateCommandHandler {
  constructor(
    @Dep(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @Dep(IOfertaFormacaoPermissionChecker)
    private readonly permissionChecker: IOfertaFormacaoPermissionChecker,
    @Dep(IModalidadeFindOneQueryHandler)
    private readonly modalidadeFindOneHandler: IModalidadeFindOneQueryHandler,
    @Dep(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @Dep(INivelFormacaoFindOneQueryHandler)
    private readonly nivelFormacaoFindOneHandler: INivelFormacaoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoCreateCommand,
  ): Promise<OfertaFormacaoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    if (dto.modalidade) {
      const modalidade = await this.modalidadeFindOneHandler.execute(accessContext, {
        id: dto.modalidade.id,
      });
      ensureExists(modalidade, Modalidade.entityName, dto.modalidade.id);
    }

    const campus = await this.campusFindOneHandler.execute(accessContext, {
      id: dto.campus.id,
    });
    ensureExists(campus, Campus.entityName, dto.campus.id);

    for (const nf of dto.niveisFormacoes) {
      const nivelFormacao = await this.nivelFormacaoFindOneHandler.execute(accessContext, {
        id: nf.id,
      });
      ensureExists(nivelFormacao, NivelFormacao.entityName, nf.id);
    }

    const domain = OfertaFormacao.create(dto);

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });
    ensureExists(result, OfertaFormacao.entityName, domain.id);

    return result;
  }
}
