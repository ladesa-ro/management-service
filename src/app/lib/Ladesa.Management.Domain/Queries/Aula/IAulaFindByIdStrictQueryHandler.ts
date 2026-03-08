import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneInputDto";
import type { AulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneOutputDto";

export interface IAulaFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto>;
}
