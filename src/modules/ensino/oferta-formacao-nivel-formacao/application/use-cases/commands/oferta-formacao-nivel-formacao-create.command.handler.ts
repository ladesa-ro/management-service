import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import {
  type IOfertaFormacaoNivelFormacaoCreateCommand,
  IOfertaFormacaoNivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.types";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class OfertaFormacaoNivelFormacaoCreateCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoCreateCommandHandler
{
  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
    @Inject(INivelFormacaoFindOneQueryHandler)
    private readonly nivelFormacaoFindOneHandler: INivelFormacaoFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoNivelFormacaoCreateCommand): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("oferta_formacao_nivel_formacao:create", {
      dto,
    });

    const createData: Partial<PersistInput<IOfertaFormacaoNivelFormacao>> = {};
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.ofertaFormacao.id },
      });
      if (!ofertaFormacao) {
        throw new ResourceNotFoundError("OfertaFormacao", dto.ofertaFormacao.id);
      }
      createData.ofertaFormacao = { id: ofertaFormacao.id };
    }
    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoFindOneHandler.execute({
        accessContext,
        dto: { id: dto.nivelFormacao.id },
      });
      if (!nivelFormacao) {
        throw new ResourceNotFoundError("NivelFormacao", dto.nivelFormacao.id);
      }
      createData.nivelFormacao = { id: nivelFormacao.id };
    }
    const { id } = await this.repository.createFromDomain(createData as any);

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("OfertaFormacaoNivelFormacao", id);
    }

    return result;
  }
}
