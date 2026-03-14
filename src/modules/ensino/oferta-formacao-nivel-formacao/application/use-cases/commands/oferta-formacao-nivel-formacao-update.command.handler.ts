import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  ensureExists,
  IAuthorizationService,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { INivelFormacaoFindOneQueryHandler } from "@/modules/ensino/nivel-formacao/domain/queries/nivel-formacao-find-one.query.handler.interface";
import { IOfertaFormacaoFindOneQueryHandler } from "@/modules/ensino/oferta-formacao/domain/queries/oferta-formacao-find-one.query.handler.interface";
import {
  type IOfertaFormacaoNivelFormacaoUpdateCommand,
  IOfertaFormacaoNivelFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/commands/oferta-formacao-nivel-formacao-update.command.handler.interface";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao/domain/oferta-formacao-nivel-formacao.types";
import { IOfertaFormacaoNivelFormacaoRepository } from "../../../domain/repositories";
import type { OfertaFormacaoNivelFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class OfertaFormacaoNivelFormacaoUpdateCommandHandlerImpl
  implements IOfertaFormacaoNivelFormacaoUpdateCommandHandler
{
  constructor(
    @Inject(IOfertaFormacaoNivelFormacaoRepository)
    private readonly repository: IOfertaFormacaoNivelFormacaoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IOfertaFormacaoFindOneQueryHandler)
    private readonly ofertaFormacaoFindOneHandler: IOfertaFormacaoFindOneQueryHandler,
    @Inject(INivelFormacaoFindOneQueryHandler)
    private readonly nivelFormacaoFindOneHandler: INivelFormacaoFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoNivelFormacaoUpdateCommand): Promise<OfertaFormacaoNivelFormacaoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, "OfertaFormacaoNivelFormacao", dto.id);

    await this.authorizationService.ensurePermission(
      "oferta_formacao_nivel_formacao:update",
      { dto },
      dto.id,
    );

    const updateData: Partial<PersistInput<IOfertaFormacaoNivelFormacao>> = {};
    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoFindOneHandler.execute({
          accessContext,
          dto: { id: dto.ofertaFormacao.id },
        }));
      if (dto.ofertaFormacao && !ofertaFormacao) {
        throw new ResourceNotFoundError("OfertaFormacao", dto.ofertaFormacao.id);
      }
      updateData.ofertaFormacao = ofertaFormacao ? { id: ofertaFormacao.id } : undefined;
    }
    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoFindOneHandler.execute({
          accessContext,
          dto: { id: dto.nivelFormacao.id },
        }));
      if (dto.nivelFormacao && !nivelFormacao) {
        throw new ResourceNotFoundError("NivelFormacao", dto.nivelFormacao.id);
      }
      updateData.nivelFormacao = nivelFormacao ? { id: nivelFormacao.id } : undefined;
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, "OfertaFormacaoNivelFormacao", dto.id);

    return result;
  }
}
