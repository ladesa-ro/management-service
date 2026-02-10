import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { ModalidadeService } from "@/modules/modalidade";
import { type IOfertaFormacao, OfertaFormacao } from "@/modules/oferta-formacao";
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

@Injectable()
export class OfertaFormacaoService
  extends BaseCrudService<
    IOfertaFormacao,
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

  constructor(
    @Inject(OFERTA_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: IOfertaFormacaoRepositoryPort,
    private readonly modalidadeService: ModalidadeService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<IOfertaFormacao>>> {
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
    return {
      ...domain,
      ...(modalidadeRef ? { modalidade: modalidadeRef } : {}),
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
    current: OfertaFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IOfertaFormacao>>> {
    const domain = OfertaFormacao.fromData(current);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    const result: Partial<PersistInput<IOfertaFormacao>> = { nome: domain.nome, slug: domain.slug };

    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      if (dto.modalidade) {
        const modalidade = await this.modalidadeService.findByIdSimpleStrict(
          accessContext,
          dto.modalidade.id,
        );
        result.modalidade = { id: modalidade.id };
      } else {
        result.modalidade = null;
      }
    }

    return result;
  }
}
