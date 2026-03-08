import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneInputDto";

export interface IAulaDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: AulaFindOneInputDto): Promise<boolean>;
}
