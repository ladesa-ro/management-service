import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { NivelFormacaoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoCreateInputDto";
import { NivelFormacaoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneInputDto";
import { NivelFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoFindOneOutputDto";
import { NivelFormacaoListInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoListInputDto";
import { NivelFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoListOutputDto";
import { NivelFormacaoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/NivelFormacaoUpdateInputDto";

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
