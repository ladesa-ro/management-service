import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneInputDto";
import type { HorarioGeradoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneOutputDto";
import type { HorarioGeradoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoUpdateInputDto";

export interface IHorarioGeradoUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto>;
}
