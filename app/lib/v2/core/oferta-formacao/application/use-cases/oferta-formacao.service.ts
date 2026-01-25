import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/v2/server/modules/oferta-formacao/http/dto";
import type { OfertaFormacaoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ModalidadeService } from "@/v2/core/modalidade/application/use-cases/modalidade.service";
import { BaseCrudService } from "@/v2/core/shared";
import type { IOfertaFormacaoRepositoryPort } from "../ports";

@Injectable()
export class OfertaFormacaoService extends BaseCrudService<
  OfertaFormacaoEntity,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoUpdateInputDto
> {
  protected readonly resourceName = "OfertaFormacao";
  protected readonly createAction = "oferta_formacao:create";
  protected readonly updateAction = "oferta_formacao:update";
  protected readonly deleteAction = "oferta_formacao:delete";
  protected readonly createFields = ["nome", "slug"] as const;
  protected readonly updateFields = ["nome", "slug"] as const;

  constructor(
    @Inject("IOfertaFormacaoRepositoryPort")
    protected readonly repository: IOfertaFormacaoRepositoryPort,
    private readonly modalidadeService: ModalidadeService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: OfertaFormacaoEntity,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<void> {
    if (dto.modalidade) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(
        accessContext,
        dto.modalidade.id,
      );
      this.repository.merge(entity, { modalidade: { id: modalidade.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: OfertaFormacaoEntity,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      if (dto.modalidade) {
        const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(
          accessContext,
          dto.modalidade.id,
        );
        this.repository.merge(entity, { modalidade: { id: modalidade.id } });
      } else {
        this.repository.merge(entity, { modalidade: null as any });
      }
    }
  }

  // Métodos prefixados para compatibilidade

  async ofertaFormacaoFindAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null = null,
    selection?: string[],
  ): Promise<OfertaFormacaoListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async ofertaFormacaoFindById(
    accessContext: AccessContext | null,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  async ofertaFormacaoFindByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async ofertaFormacaoFindByIdSimple(
    accessContext: AccessContext,
    id: OfertaFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async ofertaFormacaoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: OfertaFormacaoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async ofertaFormacaoCreate(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async ofertaFormacaoUpdate(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async ofertaFormacaoDeleteOneById(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }
}
