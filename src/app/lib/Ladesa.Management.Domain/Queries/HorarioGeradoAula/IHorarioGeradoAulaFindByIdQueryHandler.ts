import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoAulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneInputDto";
import type { HorarioGeradoAulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneOutputDto";

export interface IHorarioGeradoAulaFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;
}
