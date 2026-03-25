import { has } from "lodash";
import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import { Modalidade } from "@/modules/ensino/modalidade/domain/modalidade";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import { NivelFormacao } from "@/modules/ensino/nivel-formacao/domain/nivel-formacao";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import type { OfertaFormacaoUpdateCommand } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command";
import { IOfertaFormacaoUpdateCommandHandler } from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
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
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @DeclareDependency(INivelFormacaoFindOneQueryHandler)
    private readonly nivelFormacaoFindOneHandler: INivelFormacaoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand,
  ): Promise<OfertaFormacaoFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, OfertaFormacao.entityName, dto.id);
    ensureActiveEntity(domain, OfertaFormacao.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    // Validar existência das referências antes de atualizar o domain
    if (has(dto, "modalidade") && dto.modalidade) {
      const modalidade = await this.modalidadeFindOneHandler.execute(accessContext, {
        id: dto.modalidade.id,
      });
      ensureExists(modalidade, Modalidade.entityName, dto.modalidade.id);
    }
    if (has(dto, "campus") && dto.campus) {
      const campus = await this.campusFindOneHandler.execute(accessContext, {
        id: dto.campus.id,
      });
      ensureExists(campus, Campus.entityName, dto.campus.id);
    }
    if (has(dto, "niveisFormacoes") && dto.niveisFormacoes) {
      for (const nf of dto.niveisFormacoes) {
        const nivelFormacao = await this.nivelFormacaoFindOneHandler.execute(accessContext, {
          id: nf.id,
        });
        ensureExists(nivelFormacao, NivelFormacao.entityName, nf.id);
      }
    }

    domain.update({
      nome: dto.nome,
      slug: dto.slug,
      duracaoPeriodoEmMeses: dto.duracaoPeriodoEmMeses,
      modalidade: dto.modalidade,
      campus: dto.campus,
      niveisFormacoes: dto.niveisFormacoes,
      periodos: dto.periodos,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, OfertaFormacao.entityName, dto.id);

    return result;
  }
}
