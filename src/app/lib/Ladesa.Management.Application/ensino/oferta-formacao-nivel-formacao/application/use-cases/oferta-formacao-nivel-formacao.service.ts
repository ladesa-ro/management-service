import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { NivelFormacaoService } from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/use-cases/nivel-formacao.service";
import { OfertaFormacaoService } from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import type { OfertaFormacaoNivelFormacao } from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao";
import type {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/application/dtos";
import {
  IOfertaFormacaoNivelFormacaoRepository,
  type IOfertaFormacaoNivelFormacaoUseCasePort,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao/application/ports";

@Injectable()
export class OfertaFormacaoNivelFormacaoService
  extends BaseCrudService<
    OfertaFormacaoNivelFormacao,
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
    @Inject(IOfertaFormacaoNivelFormacaoRepository)
    protected readonly repository: IOfertaFormacaoNivelFormacaoRepository,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
    private readonly nivelFormacaoService: NivelFormacaoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<OfertaFormacaoNivelFormacao>>> {
    const result: Record<string, any> = {};

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdStrict(accessContext, {
        id: dto.ofertaFormacao.id,
      });
      result.ofertaFormacaoId = ofertaFormacao.id;
    }

    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoService.findByIdStrict(accessContext, {
        id: dto.nivelFormacao.id,
      });
      result.nivelFormacaoId = nivelFormacao.id;
    }

    return result as OfertaFormacaoNivelFormacao;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto,
    _current: OfertaFormacaoNivelFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<OfertaFormacaoNivelFormacao>>> {
    const result: Partial<PersistInput<OfertaFormacaoNivelFormacao>> = {};

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.ofertaFormacao.id,
        }));
      result.ofertaFormacaoId = ofertaFormacao ? ofertaFormacao.id : undefined;
    }

    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoService.findByIdStrict(accessContext, {
          id: dto.nivelFormacao.id,
        }));
      result.nivelFormacaoId = nivelFormacao ? nivelFormacao.id : undefined;
    }

    return result;
  }
}
