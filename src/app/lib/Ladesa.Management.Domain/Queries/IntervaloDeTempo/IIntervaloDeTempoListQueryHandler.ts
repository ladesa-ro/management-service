import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IntervaloDeTempoListInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoListInputDto";
import type { IntervaloDeTempoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoListOutputDto";

export interface IIntervaloDeTempoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: IntervaloDeTempoListInputDto | null,
  ): Promise<IntervaloDeTempoListOutputDto>;
}
