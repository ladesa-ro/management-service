import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  type ICursoUpdateCommand,
  ICursoUpdateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-update.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import type { ICurso } from "@/modules/ensino/curso/domain/curso.types";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { CURSO_REPOSITORY_PORT, type ICursoRepositoryPort } from "../../../domain/repositories";
import type { CursoFindOneOutputDto } from "../../dtos";

@Injectable()
export class CursoUpdateCommandHandlerImpl implements ICursoUpdateCommandHandler {
  constructor(
    @Inject(CURSO_REPOSITORY_PORT)
    private readonly repository: ICursoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(ICampusFindOneQueryHandler)
    private readonly campusFindOneHandler: ICampusFindOneQueryHandler,
    @Inject(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
  ) {}

  async execute({ accessContext, dto }: ICursoUpdateCommand): Promise<CursoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Curso", dto.id);
    }

    await this.authorizationService.ensurePermission("curso:update", { dto }, dto.id);

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
      if (!campus) {
        throw new ResourceNotFoundError("Campus", dto.campus.id);
      }
      updateData.campus = { id: campus.id };
    }
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ofertaFormacao.id },
      });
      if (!ofertaFormacao) {
        throw new ResourceNotFoundError("OfertaFormacao", dto.ofertaFormacao.id);
      }
      updateData.ofertaFormacao = { id: ofertaFormacao.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Curso", dto.id);
    }

    return result;
  }
}
