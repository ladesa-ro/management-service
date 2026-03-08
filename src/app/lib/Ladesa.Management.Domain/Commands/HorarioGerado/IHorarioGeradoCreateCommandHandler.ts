import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoCreateInputDto";
import type { HorarioGeradoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneOutputDto";

export interface IHorarioGeradoCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto>;
}
