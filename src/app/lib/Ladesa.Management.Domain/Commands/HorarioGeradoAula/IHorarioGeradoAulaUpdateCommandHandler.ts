import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoAulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneInputDto";
import type { HorarioGeradoAulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneOutputDto";
import type { HorarioGeradoAulaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaUpdateInputDto";

export interface IHorarioGeradoAulaUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;
}
