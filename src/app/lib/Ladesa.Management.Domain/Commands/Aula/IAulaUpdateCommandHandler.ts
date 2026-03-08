import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneInputDto";
import type { AulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneOutputDto";
import type { AulaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaUpdateInputDto";

export interface IAulaUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto>;
}
