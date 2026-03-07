import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { ModalidadeService } from "@/Ladesa.Management.Application/ensino/modalidade";
import { OfertaFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao/application/dtos";
import {
  IOfertaFormacaoRepository,
  type IOfertaFormacaoUseCasePort,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao/application/ports";

@Injectable()
export class OfertaFormacaoService
  extends BaseCrudService<
    OfertaFormacao,
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
    @Inject(IOfertaFormacaoRepository)
    protected readonly repository: IOfertaFormacaoRepository,
    private readonly modalidadeService: ModalidadeService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<OfertaFormacao>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
    current: OfertaFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<OfertaFormacao>>> {
    const domain = OfertaFormacao.fromData({
      ...current,
      modalidadeId: current.modalidade?.id ?? null,
    } as unknown as OfertaFormacao);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    const result: Partial<PersistInput<OfertaFormacao>> = { nome: domain.nome, slug: domain.slug };

    if (has(dto, "modalidade") && dto.modalidade !== undefined) {
      if (dto.modalidade) {
        const modalidade = await this.modalidadeService.findByIdSimpleStrict(
          accessContext,
          dto.modalidade.id,
        );
        result.modalidadeId = modalidade.id;
      } else {
        result.modalidadeId = null;
      }
    }

    return result;
  }
}
