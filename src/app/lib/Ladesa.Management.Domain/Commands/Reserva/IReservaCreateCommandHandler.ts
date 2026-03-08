import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ReservaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaCreateInputDto";
import type { ReservaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneOutputDto";

export interface IReservaCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: ReservaCreateInputDto,
  ): Promise<ReservaFindOneOutputDto>;
}
