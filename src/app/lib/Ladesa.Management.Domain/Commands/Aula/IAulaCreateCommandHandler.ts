import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AulaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaCreateInputDto";
import type { AulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneOutputDto";

export interface IAulaCreateCommandHandler {
  execute(accessContext: AccessContext, dto: AulaCreateInputDto): Promise<AulaFindOneOutputDto>;
}
