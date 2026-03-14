import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists, IAuthorizationService, type PersistInput } from "@/modules/@shared";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import {
  type IOfertaFormacaoUpdateCommand,
  IOfertaFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.types";
import { IOfertaFormacaoRepository } from "../../../domain/repositories";
import type { OfertaFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class OfertaFormacaoUpdateCommandHandlerImpl implements IOfertaFormacaoUpdateCommandHandler {
  constructor(
    @Inject(IOfertaFormacaoRepository)
    private readonly repository: IOfertaFormacaoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IModalidadeFindOneQueryHandler)
    private readonly modalidadeFindOneHandler: IModalidadeFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoUpdateCommand): Promise<OfertaFormacaoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, "OfertaFormacao", dto.id);

    await this.authorizationService.ensurePermission("oferta_formacao:update", { dto }, dto.id);

    const domain = OfertaFormacao.fromData(current);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    const updateData: Partial<PersistInput<IOfertaFormacao>> = {
      nome: domain.nome,
      slug: domain.slug,
    };
    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      if (dto.modalidade) {
        const modalidade = await this.modalidadeFindOneHandler.execute({
          accessContext,
          dto: { id: dto.modalidade.id },
        });
        ensureExists(modalidade, "Modalidade", dto.modalidade.id);
        updateData.modalidade = { id: modalidade.id };
      } else {
        updateData.modalidade = null;
      }
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, "OfertaFormacao", dto.id);

    return result;
  }
}
