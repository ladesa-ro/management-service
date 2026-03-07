import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type DiarioCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioCreateInputDto";
import { type DiarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneInputDto";
import { type DiarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneOutputDto";
import { type DiarioListInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioListInputDto";
import { type DiarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioListOutputDto";
import { type DiarioUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioUpdateInputDto";

export interface IDiarioUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto>;

  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto>;

  create(accessContext: AccessContext, dto: DiarioCreateInputDto): Promise<DiarioFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: DiarioFindOneInputDto): Promise<boolean>;
}
