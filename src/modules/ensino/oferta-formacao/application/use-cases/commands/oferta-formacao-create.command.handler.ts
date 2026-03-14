import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { ModalidadeService } from "@/modules/ensino/modalidade";
import {
  type IOfertaFormacaoCreateCommand,
  IOfertaFormacaoCreateCommandHandler,
} from "@/modules/ensino/oferta-formacao/domain/commands/oferta-formacao-create.command.handler.interface";
import { OfertaFormacao } from "@/modules/ensino/oferta-formacao/domain/oferta-formacao.domain";
import type { OfertaFormacaoFindOneOutputDto } from "../../dtos";
import { type IOfertaFormacaoRepositoryPort, OFERTA_FORMACAO_REPOSITORY_PORT } from "../../ports";

@Injectable()
export class OfertaFormacaoCreateCommandHandlerImpl implements IOfertaFormacaoCreateCommandHandler {
  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly repository: IOfertaFormacaoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly modalidadeService: ModalidadeService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IOfertaFormacaoCreateCommand): Promise<OfertaFormacaoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("oferta_formacao:create", { dto });

    let modalidadeRef: { id: string } | undefined;
    if (dto.modalidade) {
      const modalidade = await this.modalidadeService.findByIdSimpleStrict(
        accessContext,
        dto.modalidade.id,
      );
      modalidadeRef = { id: modalidade.id };
    }
    const domain = OfertaFormacao.criar({
      nome: dto.nome,
      slug: dto.slug,
      modalidade: modalidadeRef,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(modalidadeRef ? { modalidade: modalidadeRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("OfertaFormacao", id);
    }

    return result;
  }
}
