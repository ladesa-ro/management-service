import { Inject, Injectable } from "@nestjs/common";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import { ICampusFindOneQueryHandler } from "@/modules/ambientes/campus/domain/queries/campus-find-one.query.handler.interface";
import {
  type ICursoCreateCommand,
  ICursoCreateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import { ICursoRepository } from "../../../domain/repositories";
import type { CursoFindOneOutputDto } from "../../dtos";

@Injectable()
export class CursoCreateCommandHandlerImpl implements ICursoCreateCommandHandler {
  constructor(
    @Inject(ICursoRepository)
    private readonly repository: ICursoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
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
    ensureExists(campus, "Campus", dto.campus.id);
    const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
      accessContext,
      dto: { id: dto.ofertaFormacao.id },
    });
    ensureExists(ofertaFormacao, "OfertaFormacao", dto.ofertaFormacao.id);
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

    ensureExists(result, "Curso", id);

    return result;
  }
}
