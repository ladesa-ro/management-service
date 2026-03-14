import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CampusService } from "@/modules/ambientes/campus";
import {
  type ICursoCreateCommand,
  ICursoCreateCommandHandler,
} from "@/modules/ensino/curso/domain/commands/curso-create.command.handler.interface";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import type { CursoFindOneOutputDto } from "../../dtos";
import { CURSO_REPOSITORY_PORT, type ICursoRepositoryPort } from "../../ports";

@Injectable()
export class CursoCreateCommandHandlerImpl implements ICursoCreateCommandHandler {
  constructor(
    @Inject(CURSO_REPOSITORY_PORT)
    private readonly repository: ICursoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
  ) {}

  async execute({ accessContext, dto }: ICursoCreateCommand): Promise<CursoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("curso:create", { dto });

    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
      accessContext,
      dto.ofertaFormacao.id,
    );
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
