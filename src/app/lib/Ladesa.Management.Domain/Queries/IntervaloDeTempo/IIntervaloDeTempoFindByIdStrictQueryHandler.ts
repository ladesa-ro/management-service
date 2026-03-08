import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { IntervaloDeTempoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoFindOneInputDto";
import type { IntervaloDeTempoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoFindOneOutputDto";

export interface IIntervaloDeTempoFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto>;
}
