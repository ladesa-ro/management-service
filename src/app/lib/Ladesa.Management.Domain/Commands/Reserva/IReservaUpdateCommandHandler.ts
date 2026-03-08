import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ReservaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneInputDto";
import type { ReservaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneOutputDto";
import type { ReservaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaUpdateInputDto";

export interface IReservaUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto & ReservaUpdateInputDto,
  ): Promise<ReservaFindOneOutputDto>;
}
