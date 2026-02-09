import { Inject, Injectable } from "@nestjs/common";
import { BaseCrudService } from "@/modules/@shared";
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
import type { NivelFormacaoEntity } from "@/modules/nivel-formacao/infrastructure/persistence/typeorm";

@Injectable()
export class NivelFormacaoService
  extends BaseCrudService<
    NivelFormacaoEntity,
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
  protected readonly createFields = ["slug"] as const;
  protected readonly updateFields = ["slug"] as const;

  constructor(
    @Inject(NIVEL_FORMACAO_REPOSITORY_PORT)
    protected readonly repository: INivelFormacaoRepositoryPort,
  ) {
    super();
  }
}
