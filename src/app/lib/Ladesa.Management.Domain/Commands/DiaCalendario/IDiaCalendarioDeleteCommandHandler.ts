import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiaCalendarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiaCalendarioFindOneInputDto";

export interface IDiaCalendarioDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: DiaCalendarioFindOneInputDto): Promise<boolean>;
}
