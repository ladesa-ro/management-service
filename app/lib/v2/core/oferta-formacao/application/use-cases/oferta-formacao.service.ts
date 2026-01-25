import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/v2/adapters/in/http/oferta-formacao/dto";
import type { OfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";
import type { IOfertaFormacaoRepositoryPort, IOfertaFormacaoUseCasePort } from "../ports";

@Injectable()
export class OfertaFormacaoService implements IOfertaFormacaoUseCasePort {
  constructor(
    @Inject("IOfertaFormacaoRepositoryPort")
    private ofertaFormacaoRepository: IOfertaFormacaoRepositoryPort,
    private modalidadeService: ModalidadeService,
  ) {}

  async ofertaFormacaoFindAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<OfertaFormacaoListOutputDto> {
    return this.ofertaFormacaoRepository.findAll(accessContext, dto, selection);
  }

  async ofertaFormacaoFindById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.ofertaFormacaoRepository.findById(accessContext, dto, selection);
  }

  async ofertaFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const ofertaFormacao = await this.ofertaFormacaoRepository.findById(
      accessContext,
      dto,
      selection,
    );

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  async ofertaFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: OfertaFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.ofertaFormacaoRepository.findByIdSimple(accessContext, id, selection);
  }

  async ofertaFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: OfertaFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const ofertaFormacao = await this.ofertaFormacaoRepository.findByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!ofertaFormacao) {
      throw new NotFoundException();
    }

    return ofertaFormacao;
  }

  async ofertaFormacaoCreate(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    await accessContext.ensurePermission("oferta_formacao:create", { dto } as any);

    const dtoOfertaFormacao = pick(dto, ["nome", "slug"]);

    const ofertaFormacao = this.ofertaFormacaoRepository.create();

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    if (dto.modalidade) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(
        accessContext,
        dto.modalidade.id,
      );

      this.ofertaFormacaoRepository.merge(ofertaFormacao, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    await this.ofertaFormacaoRepository.save(ofertaFormacao);

    return this.ofertaFormacaoFindByIdStrict(accessContext, { id: ofertaFormacao.id });
  }

  async ofertaFormacaoUpdate(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    const currentOfertaFormacao = await this.ofertaFormacaoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission("oferta_formacao:update", { dto }, dto.id);

    const dtoOfertaFormacao = pick(dto, ["nome", "slug"]);

    const ofertaFormacao = <OfertaFormacaoEntity>{
      id: currentOfertaFormacao.id,
    };

    this.ofertaFormacaoRepository.merge(ofertaFormacao, {
      ...dtoOfertaFormacao,
    });

    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      const modalidade =
        dto.modalidade &&
        (await this.modalidadeService.modalidadeFindByIdSimpleStrict(
          accessContext,
          dto.modalidade.id,
        ));

      this.ofertaFormacaoRepository.merge(ofertaFormacao, {
        modalidade: modalidade && {
          id: modalidade.id,
        },
      });
    }

    await this.ofertaFormacaoRepository.save(ofertaFormacao);

    return this.ofertaFormacaoFindByIdStrict(accessContext, { id: ofertaFormacao.id });
  }

  async ofertaFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("oferta_formacao:delete", { dto }, dto.id);

    const ofertaFormacao = await this.ofertaFormacaoFindByIdStrict(accessContext, dto);

    if (ofertaFormacao) {
      await this.ofertaFormacaoRepository.softDeleteById(ofertaFormacao.id);
    }

    return true;
  }
}
