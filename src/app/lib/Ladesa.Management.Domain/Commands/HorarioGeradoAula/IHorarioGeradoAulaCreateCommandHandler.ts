import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoAulaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaCreateInputDto";
import type { HorarioGeradoAulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneOutputDto";

export interface IHorarioGeradoAulaCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;
}
