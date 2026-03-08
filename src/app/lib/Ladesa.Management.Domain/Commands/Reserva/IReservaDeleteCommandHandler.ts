import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { ReservaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/ReservaFindOneInputDto";

export interface IReservaDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: ReservaFindOneInputDto): Promise<boolean>;
}
