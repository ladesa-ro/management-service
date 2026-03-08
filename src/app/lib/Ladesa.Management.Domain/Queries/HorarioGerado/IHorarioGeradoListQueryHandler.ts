import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoListInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoListInputDto";
import type { HorarioGeradoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoListOutputDto";

export interface IHorarioGeradoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto>;
}
