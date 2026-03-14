import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  type ICursoCreateCommand,
  ICursoCreateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { ICursoPermissionChecker } from "../../domain/authorization";
import { ICursoRepository } from "../../domain/repositories";
import type { CursoFindOneOutputDto } from "../dtos";

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

  async execute({ accessContext, dto }: ICursoCreateCommand): Promise<CursoFindOneOutputDto> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const campus = await this.campusFindOneHandler.execute({
      accessContext,
      dto: { id: dto.campus.id },
    });
    ensureExists(campus, Campus.entityName, dto.campus.id);
    const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.ofertaFormacao.id },
    });
    ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
    const domain = Curso.criar({
      nome: dto.nome,
      nomeAbreviado: dto.nomeAbreviado,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      campus: { id: campus.id },
      ofertaFormacao: { id: ofertaFormacao.id },
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, Curso.entityName, id);

    return result;
  }
}
