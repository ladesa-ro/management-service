import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type AulaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaCreateInputDto";
import { type AulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneInputDto";
import { type AulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneOutputDto";
import { type AulaListInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaListInputDto";
import { type AulaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaListOutputDto";
import { type AulaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaUpdateInputDto";

export interface IAulaUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: AulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto>;

  findByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto>;

  create(accessContext: AccessContext, dto: AulaCreateInputDto): Promise<AulaFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: AulaFindOneInputDto): Promise<boolean>;
}
