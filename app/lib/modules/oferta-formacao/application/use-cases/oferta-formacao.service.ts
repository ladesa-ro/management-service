import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { ModalidadeService } from "@/modules/modalidade";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/modules/oferta-formacao/application/dtos";
import {
  type IOfertaFormacaoRepositoryPort,
  type IOfertaFormacaoUseCasePort,
  OFERTA_FORMACAO_REPOSITORY_PORT,
} from "@/modules/oferta-formacao/application/ports";
import type { OfertaFormacaoEntity } from "@/modules/oferta-formacao/infrastructure/persistence/typeorm";

@Injectable()
export class OfertaFormacaoService
  extends BaseCrudService<
    OfertaFormacaoEntity,
    OfertaFormacaoListInputDto,
    OfertaFormacaoListOutputDto,
    OfertaFormacaoFindOneInputDto,
    OfertaFormacaoFindOneOutputDto,
    OfertaFormacaoCreateInputDto,
    OfertaFormacaoUpdateInputDto
  >
  implements IOfertaFormacaoUseCasePort
{
  protected readonly resourceName = "OfertaFormacao";
  protected readonly createAction = "oferta_formacao:create";
  protected readonly updateAction = "oferta_formacao:update";
  protected readonly deleteAction = "oferta_formacao:delete";
  protected readonly createFields = ["nome", "slug"] as const;
  protected readonly updateFields = ["nome", "slug"] as const;

  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
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
      const modalidade = await this.modalidadeService.findByIdSimpleStrict(
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
        const modalidade = await this.modalidadeService.findByIdSimpleStrict(
          accessContext,
          dto.modalidade.id,
        );
        this.repository.merge(entity, { modalidade: { id: modalidade.id } });
      } else {
        this.repository.merge(entity, { modalidade: null as any });
      }
    }
  }
}
