import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "../../dtos";

export interface IOfertaFormacaoUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: OfertaFormacaoListInputDto | null,
  ): Promise<OfertaFormacaoListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  create(
    accessContext: AccessContext,
    dto: OfertaFormacaoCreateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto,
  ): Promise<OfertaFormacaoFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: OfertaFormacaoFindOneInputDto): Promise<boolean>;
}
