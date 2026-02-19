import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoListInputDto,
  NivelFormacaoListOutputDto,
  NivelFormacaoUpdateInputDto,
} from "../../dtos";

export interface INivelFormacaoUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: NivelFormacaoListInputDto | null,
  ): Promise<NivelFormacaoListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;

  create(
    accessContext: AccessContext,
    dto: NivelFormacaoCreateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto,
  ): Promise<NivelFormacaoFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: NivelFormacaoFindOneInputDto): Promise<boolean>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<NivelFormacaoFindOneOutputDto>;
}
