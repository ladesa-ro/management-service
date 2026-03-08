import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiaCalendarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneInputDto";
import type { DiaCalendarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneOutputDto";

export interface IDiaCalendarioFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutputDto>;
}
