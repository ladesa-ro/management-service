import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IntervaloDeTempoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoFindOneOutputDto";
import type { IntervaloDeTempoInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoInputDto";

export interface IIntervaloDeTempoCreateOrUpdateCommandHandler {
  execute(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto>;
}
