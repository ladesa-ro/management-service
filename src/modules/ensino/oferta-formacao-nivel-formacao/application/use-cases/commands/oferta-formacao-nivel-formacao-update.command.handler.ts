import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { NivelFormacaoService } from "@/modules/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import {
  type IOfertaFormacaoNivelFormacaoUpdateCommand,
  IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.types";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "../../dtos";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class OfertaFormacaoNivelFormacaoUpdateCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoUpdateCommandHandler
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
  }: IOfertaFormacaoNivelFormacaoUpdateCommand): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("OfertaFormacaoNivelFormacao", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "oferta_formacao_nivel_formacao:update",
      { dto },
      dto.id,
    );

    const updateData: Partial<PersistInput<IOfertaFormacaoNivelFormacao>> = {};
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.ofertaFormacao.id,
        }));
      updateData.ofertaFormacao = ofertaFormacao && { id: ofertaFormacao.id };
    }
    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoService.findByIdStrict(accessContext, {
          id: dto.nivelFormacao.id,
        }));
      updateData.nivelFormacao = nivelFormacao && { id: nivelFormacao.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("OfertaFormacaoNivelFormacao", dto.id);
    }

    return result;
  }
}
