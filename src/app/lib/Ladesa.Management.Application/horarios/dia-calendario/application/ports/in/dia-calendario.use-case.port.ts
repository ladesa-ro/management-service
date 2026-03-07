import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type DiaCalendarioCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioCreateInputDto";
import { type DiaCalendarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneInputDto";
import { type DiaCalendarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneOutputDto";
import { type DiaCalendarioListInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioListInputDto";
import { type DiaCalendarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioListOutputDto";
import { type DiaCalendarioUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioUpdateInputDto";

export interface IDiaCalendarioUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto>;

  create(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto): Promise<boolean>;
}
