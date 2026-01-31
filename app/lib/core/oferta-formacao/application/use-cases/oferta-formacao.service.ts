import { Inject, Injectable } from "@nestjs/common";
import { has, pick } from "lodash";
import { ResourceNotFoundError } from "@/core/@shared";
import { ModalidadeService } from "@/core/modalidade";
import {
  OfertaFormacaoCreateInput,
  OfertaFormacaoFindOneInput,
  OfertaFormacaoFindOneOutput,
  OfertaFormacaoListInput,
  OfertaFormacaoListOutput,
  OfertaFormacaoUpdateInput,
} from "@/core/oferta-formacao/application/dtos";
import {
  type IOfertaFormacaoRepositoryPort,
  type IOfertaFormacaoUseCasePort,
  OFERTA_FORMACAO_REPOSITORY_PORT,
} from "@/core/oferta-formacao/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class OfertaFormacaoService implements IOfertaFormacaoUseCasePort {
  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
    private readonly ofertaFormacaoRepository: IOfertaFormacaoRepositoryPort,
    private readonly modalidadeService: ModalidadeService,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInput | null = null,
  ): Promise<OfertaFormacaoListOutput> {
    return this.ofertaFormacaoRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInput,
  ): Promise<OfertaFormacaoFindOneOutput | null> {
    return this.ofertaFormacaoRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInput,
  ): Promise<OfertaFormacaoFindOneOutput> {
    const ofertaFormacao = await this.ofertaFormacaoRepository.findById(accessContext, dto);

    if (!ofertaFormacao) {
      throw new ResourceNotFoundError("OfertaFormacao", dto.id);
    }

    return ofertaFormacao;
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<OfertaFormacaoFindOneOutput> {
    return this.findByIdStrict(accessContext, { id });
  }

  async create(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInput,
  ): Promise<OfertaFormacaoFindOneOutput> {
    const dtoOfertaFormacao = pick(dto, ["nome", "slug"]);

    const ofertaFormacao = this.ofertaFormacaoRepository.create();
    this.ofertaFormacaoRepository.merge(ofertaFormacao, { ...dtoOfertaFormacao });

    if (dto.modalidade) {
      const modalidade = await this.modalidadeService.findByIdSimpleStrict(
        accessContext,
        dto.modalidade.id,
      );
      this.ofertaFormacaoRepository.merge(ofertaFormacao, { modalidade: { id: modalidade.id } });
    }

    await this.ofertaFormacaoRepository.save(ofertaFormacao);

    return this.findByIdStrict(accessContext, { id: ofertaFormacao.id });
  }

  async update(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInput & OfertaFormacaoUpdateInput,
  ): Promise<OfertaFormacaoFindOneOutput> {
    const ofertaFormacao = await this.findByIdStrict(accessContext, { id: dto.id });

    const dtoOfertaFormacao = pick(dto, ["nome", "slug"]);
    const entity = this.ofertaFormacaoRepository.create();
    this.ofertaFormacaoRepository.merge(entity, { id: ofertaFormacao.id, ...dtoOfertaFormacao });

    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      if (dto.modalidade) {
        const modalidade = await this.modalidadeService.findByIdSimpleStrict(
          accessContext,
          dto.modalidade.id,
        );
        this.ofertaFormacaoRepository.merge(entity, { modalidade: { id: modalidade.id } });
      } else {
        this.ofertaFormacaoRepository.merge(entity, { modalidade: null as any });
      }
    }

    await this.ofertaFormacaoRepository.save(entity);

    return this.findByIdStrict(accessContext, { id: dto.id });
  }

  async deleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInput,
  ): Promise<boolean> {
    await this.findByIdStrict(accessContext, dto);
    await this.ofertaFormacaoRepository.softDeleteById(dto.id);
    return true;
  }
}
