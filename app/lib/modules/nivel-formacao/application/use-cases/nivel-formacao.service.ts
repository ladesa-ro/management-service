import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import type {
  NivelFormacaoCreateInput,
  NivelFormacaoFindOneInput,
  NivelFormacaoFindOneOutput,
  NivelFormacaoListInput,
  NivelFormacaoListOutput,
  NivelFormacaoUpdateInput,
} from "@/modules/nivel-formacao/application/dtos";
import {
  type INivelFormacaoRepositoryPort,
  type INivelFormacaoUseCasePort,
  NIVEL_FORMACAO_REPOSITORY_PORT,
} from "@/modules/nivel-formacao/application/ports";
import type { NivelFormacaoEntity } from "@/modules/nivel-formacao/infrastructure/persistence/typeorm";

@Injectable()
export class NivelFormacaoService
  extends BaseCrudService<
    NivelFormacaoEntity,
    NivelFormacaoListInput,
    NivelFormacaoListOutput,
    NivelFormacaoFindOneInput,
    NivelFormacaoFindOneOutput,
    NivelFormacaoCreateInput,
    NivelFormacaoUpdateInput
  >
  implements INivelFormacaoUseCasePort
{
  protected readonly resourceName = "NivelFormacao";
  protected readonly createAction = "nivel_formacao:create";
  protected readonly updateAction = "nivel_formacao:update";
  protected readonly deleteAction = "nivel_formacao:delete";
  protected readonly createFields = ["slug"] as const;
  protected readonly updateFields = ["slug"] as const;

  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: INivelFormacaoRepositoryPort,
  ) {
    super();
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<NivelFormacaoFindOneOutput> {
    return this.findByIdStrict(accessContext, { id });
  }
}
