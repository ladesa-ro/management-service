import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoAulaListInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaListInputDto";
import type { HorarioGeradoAulaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaListOutputDto";

export interface IHorarioGeradoAulaListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutputDto>;
}
