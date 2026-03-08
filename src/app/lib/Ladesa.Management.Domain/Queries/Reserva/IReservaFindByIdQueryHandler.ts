import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ReservaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneInputDto";
import type { ReservaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneOutputDto";

export interface IReservaFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ReservaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<ReservaFindOneOutputDto | null>;
}
