import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ReservaListInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaListInputDto";
import type { ReservaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaListOutputDto";

export interface IReservaListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: ReservaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<ReservaListOutputDto>;
}
