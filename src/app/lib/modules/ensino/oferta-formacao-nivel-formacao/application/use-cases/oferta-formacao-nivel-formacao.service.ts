import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { NivelFormacaoService } from "@/modules/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import type { IOfertaFormacaoNivelFormacao } from "@/modules/ensino/oferta-formacao-nivel-formacao";
import type {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/application/dtos";
import {
  type IOfertaFormacaoNivelFormacaoRepositoryPort,
  type IOfertaFormacaoNivelFormacaoUseCasePort,
  OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT,
} from "@/modules/ensino/oferta-formacao-nivel-formacao/application/ports";

@Injectable()
export class OfertaFormacaoNivelFormacaoService
  extends BaseCrudService<
    IOfertaFormacaoNivelFormacao,
    OfertaFormacaoNivelFormacaoListInputDto,
    OfertaFormacaoNivelFormacaoListOutputDto,
    OfertaFormacaoNivelFormacaoFindOneInputDto,
    OfertaFormacaoNivelFormacaoFindOneOutputDto,
    OfertaFormacaoNivelFormacaoCreateInputDto,
    OfertaFormacaoNivelFormacaoUpdateInputDto
  >
  implements IOfertaFormacaoNivelFormacaoUseCasePort
{
  protected readonly resourceName = "OfertaFormacaoNivelFormacao";
  protected readonly createAction = "oferta_formacao_nivel_formacao:create";
  protected readonly updateAction = "oferta_formacao_nivel_formacao:update";
  protected readonly deleteAction = "oferta_formacao_nivel_formacao:delete";

  constructor(
    @Inject(OFERTA_FORMACAO_NIVEL_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: IOfertaFormacaoNivelFormacaoRepositoryPort,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
    private readonly nivelFormacaoService: NivelFormacaoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<IOfertaFormacaoNivelFormacao>>> {
    const result: Record<string, any> = {};

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdStrict(accessContext, {
        id: dto.ofertaFormacao.id,
      });
      result.ofertaFormacao = { id: ofertaFormacao.id };
    }

    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoService.findByIdStrict(accessContext, {
        id: dto.nivelFormacao.id,
      });
      result.nivelFormacao = { id: nivelFormacao.id };
    }

    return result as IOfertaFormacaoNivelFormacao;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto,
    _current: OfertaFormacaoNivelFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<IOfertaFormacaoNivelFormacao>>> {
    const result: Partial<PersistInput<IOfertaFormacaoNivelFormacao>> = {};

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.ofertaFormacao.id,
        }));
      result.ofertaFormacao = ofertaFormacao && { id: ofertaFormacao.id };
    }

    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoService.findByIdStrict(accessContext, {
          id: dto.nivelFormacao.id,
        }));
      result.nivelFormacao = nivelFormacao && { id: nivelFormacao.id };
    }

    return result;
  }
}
