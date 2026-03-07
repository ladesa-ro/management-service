import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type HorarioGeradoAulaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaCreateInputDto";
import { type HorarioGeradoAulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneInputDto";
import { type HorarioGeradoAulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneOutputDto";
import { type HorarioGeradoAulaListInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaListInputDto";
import { type HorarioGeradoAulaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaListOutputDto";
import { type HorarioGeradoAulaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaUpdateInputDto";

export interface IHorarioGeradoAulaUseCasePort {
  horarioGeradoAulaFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutputDto>;

  horarioGeradoAulaFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;

  horarioGeradoAulaFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  horarioGeradoAulaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;

  horarioGeradoAulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  horarioGeradoAulaCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  HorarioGeradoAulaUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  horarioGeradoAulaDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
  ): Promise<boolean>;
}
