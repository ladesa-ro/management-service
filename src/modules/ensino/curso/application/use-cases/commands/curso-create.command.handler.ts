import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  type ICursoCreateCommand,
  ICursoCreateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { CURSO_REPOSITORY_PORT, type ICursoRepositoryPort } from "../../../domain/repositories";
import type { CursoFindOneOutputDto } from "../../dtos";

@Injectable()
export class CursoCreateCommandHandlerImpl implements ICursoCreateCommandHandler {
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

  async execute({ accessContext, dto }: ICursoCreateCommand): Promise<CursoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("curso:create", { dto });

    const campus = await this.campusFindOneHandler.execute({
      accessContext,
      dto: { id: dto.campus.id },
    });
    if (!campus) {
      throw new ResourceNotFoundError("Campus", dto.campus.id);
    }
    const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.ofertaFormacao.id },
    });
    if (!ofertaFormacao) {
      throw new ResourceNotFoundError("OfertaFormacao", dto.ofertaFormacao.id);
    }
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

    if (!result) {
      throw new ResourceNotFoundError("Curso", id);
    }

    return result;
  }
}
