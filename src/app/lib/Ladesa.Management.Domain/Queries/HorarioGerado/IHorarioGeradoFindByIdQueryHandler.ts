import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneInputDto";
import type { HorarioGeradoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneOutputDto";

export interface IHorarioGeradoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null>;
}
