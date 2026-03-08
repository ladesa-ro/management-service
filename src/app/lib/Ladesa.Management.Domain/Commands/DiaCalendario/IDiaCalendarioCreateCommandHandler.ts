import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiaCalendarioCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioCreateInputDto";
import type { DiaCalendarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneOutputDto";

export interface IDiaCalendarioCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto>;
}
