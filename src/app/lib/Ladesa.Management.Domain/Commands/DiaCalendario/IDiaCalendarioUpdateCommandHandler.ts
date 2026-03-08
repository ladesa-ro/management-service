import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiaCalendarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneInputDto";
import type { DiaCalendarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneOutputDto";
import type { DiaCalendarioUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioUpdateInputDto";

export interface IDiaCalendarioUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto & DiaCalendarioUpdateInputDto,
  ): Promise<DiaCalendarioFindOneOutputDto>;
}
