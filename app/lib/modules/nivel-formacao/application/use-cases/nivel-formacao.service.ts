import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { type INivelFormacao, NivelFormacao } from "@/modules/nivel-formacao";
import type {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "@/modules/nivel-formacao/application/dtos";
import {
  type INivelFormacaoRepositoryPort,
  type INivelFormacaoUseCasePort,
  NIVEL_FORMACAO_REPOSITORY_PORT,
} from "@/modules/nivel-formacao/application/ports";

@Injectable()
export class NivelFormacaoService
  extends BaseCrudService<
    INivelFormacao,
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
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: INivelFormacaoRepositoryPort,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<Partial<PersistInput<INivelFormacao>>> {
    const domain = NivelFormacao.criar({ slug: dto.slug });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
    current: NivelFormacaoFindOneOutputDto,
  ): Promise<Partial<PersistInput<INivelFormacao>>> {
    const domain = NivelFormacao.fromData(current);
    domain.atualizar({ slug: dto.slug });
    return { slug: domain.slug };
  }
}
