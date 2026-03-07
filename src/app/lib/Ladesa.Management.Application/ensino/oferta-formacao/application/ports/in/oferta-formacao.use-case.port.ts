import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { OfertaFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoCreateInputDto";
import { OfertaFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoFindOneInputDto";
import { OfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoFindOneOutputDto";
import { OfertaFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoListInputDto";
import { OfertaFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoListOutputDto";
import { OfertaFormacaoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/OfertaFormacaoUpdateInputDto";

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
