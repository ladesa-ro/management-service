import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { NivelFormacao } from "@/Ladesa.Management.Application/ensino/nivel-formacao";
import {
  INivelFormacaoRepository,
  type INivelFormacaoUseCasePort,
} from "@/Ladesa.Management.Application/ensino/nivel-formacao/application/ports";
import { type NivelFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoCreateInputDto";
import { type NivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneInputDto";
import { type NivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneOutputDto";
import { type NivelFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoListInputDto";
import { type NivelFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoListOutputDto";
import { type NivelFormacaoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoUpdateInputDto";

@Injectable()
export class NivelFormacaoService
  extends BaseCrudService<
    NivelFormacao,
    NivelFormacaoListInputDto,
    NivelFormacaoListOutputDto,
    NivelFormacaoFindOneInputDto,
    NivelFormacaoFindOneOutputDto,
    NivelFormacaoCreateInputDto,
    NivelFormacaoUpdateInputDto
  >
  implements INivelFormacaoUseCasePort
{
  protected readonly resourceName = "NivelFormacao";
  protected readonly createAction = "nivel_formacao:create";
  protected readonly updateAction = "nivel_formacao:update";
  protected readonly deleteAction = "nivel_formacao:delete";

  constructor(
    @Inject(INivelFormacaoRepository)
    protected readonly repository: INivelFormacaoRepository,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<NivelFormacao>>> {
    const domain = NivelFormacao.criar({ slug: dto.slug });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
    current: NivelFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<NivelFormacao>>> {
    const domain = NivelFormacao.fromData(current as unknown as NivelFormacao);
    domain.atualizar({ slug: dto.slug });
    return { slug: domain.slug };
  }
}
