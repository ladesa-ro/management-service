import { has } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext, PersistInput } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { CursoUpdateCommand } from "@/modules/ensino/curso/domain/commands/curso-update.command";
import { ICursoUpdateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import type { ICurso } from "@/modules/ensino/curso/domain/curso";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import type { CursoFindOneQuery } from "@/modules/ensino/curso/domain/queries";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { ICursoPermissionChecker } from "../../domain/authorization";
import type { CursoFindOneQueryResult } from "../../domain/queries";
import { ICursoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CursoUpdateCommandHandlerImpl implements ICursoUpdateCommandHandler {
  constructor(
    @DeclareDependency(ICursoRepository)
    private readonly repository: ICursoRepository,
    @DeclareDependency(ICursoPermissionChecker)
    private readonly permissionChecker: ICursoPermissionChecker,
    @DeclareDependency(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @DeclareDependency(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CursoFindOneQuery & CursoUpdateCommand,
  ): Promise<CursoFindOneQueryResult> {
    const currentDomain = await this.repository.loadById(accessContext, dto.id);

    ensureExists(currentDomain, Curso.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Curso.load(currentDomain);
    domain.update({ nome: dto.nome, nomeAbreviado: dto.nomeAbreviado });
    const updateData: Partial<PersistInput<ICurso>> = { ...domain };
    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
      ensureExists(campus, Campus.entityName, dto.campus.id);
      updateData.campus = { id: campus.id };
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
        id: dto.ofertaFormacao.id,
      });
      ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
      updateData.ofertaFormacao = { id: ofertaFormacao.id };
    }
    await this.repository.update(currentDomain.id, updateData);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });

    ensureExists(result, Curso.entityName, dto.id);

    return result;
  }
}
