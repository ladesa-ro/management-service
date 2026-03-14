import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { NivelFormacaoService } from "@/modules/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import {
  type IOfertaFormacaoNivelFormacaoCreateCommand,
  IOfertaFormacaoNivelFormacaoCreateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-create.command.handler.interface";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.types";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "../../dtos";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class OfertaFormacaoNivelFormacaoCreateCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoCreateCommandHandler
{
  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
    private readonly nivelFormacaoService: NivelFormacaoService,
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
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdStrict(accessContext, {
        id: dto.ofertaFormacao.id,
      });
      createData.ofertaFormacao = { id: ofertaFormacao.id };
    }
    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoService.findByIdStrict(accessContext, {
        id: dto.nivelFormacao.id,
      });
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
