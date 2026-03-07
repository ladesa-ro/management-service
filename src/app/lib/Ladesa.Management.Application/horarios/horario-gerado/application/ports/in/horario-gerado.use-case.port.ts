import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type HorarioGeradoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoCreateInputDto";
import { type HorarioGeradoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneInputDto";
import { type HorarioGeradoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneOutputDto";
import { type HorarioGeradoListInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoListInputDto";
import { type HorarioGeradoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoListOutputDto";
import { type HorarioGeradoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoUpdateInputDto";

export interface IHorarioGeradoUseCasePort {
  horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto>;

  horarioGeradoFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null>;

  horarioGeradoFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto | null>;

  horarioGeradoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
  ): Promise<boolean>;
}
