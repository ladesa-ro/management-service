import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { Campus } from "@/modules/ambientes/campus/domain/campus";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import type { CursoCreateCommand } from "@/modules/ensino/curso/domain/commands/curso-create.command";
import { ICursoCreateCommandHandler } from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { ICursoPermissionChecker } from "../../domain/authorization";
import type { CursoFindOneQueryResult } from "../../domain/queries";
import { ICursoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CursoCreateCommandHandlerImpl implements ICursoCreateCommandHandler {
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
    dto: CursoCreateCommand,
  ): Promise<CursoFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute(accessContext, { id: dto.campus.id });
    ensureExists(campus, Campus.entityName, dto.campus.id);
    const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute(accessContext, {
      id: dto.ofertaFormacao.id,
    });
    ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
    const domain = Curso.create({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
    });

    const { id } = await this.repository.create({
      ...domain,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
      imagemCapa: domain.imagemCapa ? { id: domain.imagemCapa.id } : null,
    });

    const result = await this.repository.getFindOneQueryResult(accessContext, { id });

    ensureExists(result, Curso.entityName, id);

    return result;
  }
}
