import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  type ICursoUpdateCommand,
  ICursoUpdateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import type { ICurso } from "@/modules/ensino/curso/domain/curso.types";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { ICursoPermissionChecker } from "../../domain/authorization";
import { ICursoRepository } from "../../domain/repositories";
import type { CursoFindOneOutputDto } from "../dtos";

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

  async execute({ accessContext, dto }: ICursoUpdateCommand): Promise<CursoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Curso.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Curso.fromData(current);
    domain.atualizar({ nome: dto.nome, nomeAbreviado: dto.nomeAbreviado });
    const updateData: Partial<PersistInput<ICurso>> = {
      nome: domain.nome,
      nomeAbreviado: domain.nomeAbreviado,
    };
    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusFindOneHandler.execute({
        accessContext,
        dto: { id: dto.campus.id },
      });
      ensureExists(campus, Campus.entityName, dto.campus.id);
      updateData.campus = { id: campus.id };
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ofertaFormacao.id },
      });
      ensureExists(ofertaFormacao, OfertaFormacao.entityName, dto.ofertaFormacao.id);
      updateData.ofertaFormacao = { id: ofertaFormacao.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Curso.entityName, dto.id);

    return result;
  }
}
