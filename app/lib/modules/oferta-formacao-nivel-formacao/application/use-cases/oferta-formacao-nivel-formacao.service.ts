import { Inject, Injectable } from "@nestjs/common";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  OfertaFormacaoNivelFormacaoCreateInput,
  OfertaFormacaoNivelFormacaoFindOneInput,
  OfertaFormacaoNivelFormacaoFindOneOutput,
  OfertaFormacaoNivelFormacaoListInput,
  OfertaFormacaoNivelFormacaoListOutput,
  OfertaFormacaoNivelFormacaoUpdateInput,
} from "@/modules/oferta-formacao-nivel-formacao/application/dtos";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  type IOfertaFormacaoNivelFormacaoUseCasePort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "@/modules/oferta-formacao-nivel-formacao/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class OfertaFormacaoNivelFormacaoService implements IOfertaFormacaoNivelFormacaoUseCasePort {
  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    private readonly ofertaFormacaoNivelFormacaoRepository: IOfertaFormacaoNivelFormacaoRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoListInput | null = null,
  ): Promise<OfertaFormacaoNivelFormacaoListOutput> {
    return this.ofertaFormacaoNivelFormacaoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput | null> {
    return this.ofertaFormacaoNivelFormacaoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput> {
    const ofertaFormacaoNivelFormacao = await this.ofertaFormacaoNivelFormacaoRepository.findById(
      accessContext,
      dto,
    );

    if (!ofertaFormacaoNivelFormacao) {
      throw new ResourceNotFoundError("OfertaFormacaoNivelFormacao", dto.id);
    }

    return ofertaFormacaoNivelFormacao;
  }

  async create(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput> {
    return this.ofertaFormacaoNivelFormacaoRepository.createOne(accessContext, dto);
  }

  async update(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput & OfertaFormacaoNivelFormacaoUpdateInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput> {
    return this.ofertaFormacaoNivelFormacaoRepository.update(accessContext, dto);
  }

  async deleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<boolean> {
    return this.ofertaFormacaoNivelFormacaoRepository.deleteById(accessContext, dto);
  }
}
