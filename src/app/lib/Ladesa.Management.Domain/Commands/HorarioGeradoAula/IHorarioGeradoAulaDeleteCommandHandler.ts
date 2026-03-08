import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { HorarioGeradoAulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneInputDto";

export interface IHorarioGeradoAulaDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: HorarioGeradoAulaFindOneInputDto): Promise<boolean>;
}
