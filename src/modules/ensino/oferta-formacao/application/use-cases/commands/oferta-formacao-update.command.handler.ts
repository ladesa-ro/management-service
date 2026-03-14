import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IModalidadeFindOneQueryHandler } from "@/modules/ensino/modalidade/domain/queries/modalidade-find-one.query.handler.interface";
import {
  type IOfertaFormacaoUpdateCommand,
  IOfertaFormacaoUpdateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-update.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import type { IOfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.types";
import {
  type IOfertaFormacaoRepositoryPort,
  OFERTA_FORMACAO_REPOSITORY_PORT,
} from "../../../domain/repositories";
import type { OfertaFormacaoFindOneOutputDto } from "../../dtos";

@Injectable()
export class OfertaFormacaoUpdateCommandHandlerImpl implements IOfertaFormacaoUpdateCommandHandler {
  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IModalidadeFindOneQueryHandler)
    private readonly modalidadeFindOneHandler: IModalidadeFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoUpdateCommand): Promise<OfertaFormacaoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("OfertaFormacao", dto.id);
    }

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
        if (!modalidade) {
          throw new ResourceNotFoundError("Modalidade", dto.modalidade.id);
        }
        updateData.modalidade = { id: modalidade.id };
      } else {
        updateData.modalidade = null;
      }
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("OfertaFormacao", dto.id);
    }

    return result;
  }
}
