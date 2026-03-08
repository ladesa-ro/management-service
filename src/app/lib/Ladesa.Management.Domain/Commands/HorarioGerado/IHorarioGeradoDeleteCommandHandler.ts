import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoFindOneInputDto";

export interface IHorarioGeradoDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: HorarioGeradoFindOneInputDto): Promise<boolean>;
}
