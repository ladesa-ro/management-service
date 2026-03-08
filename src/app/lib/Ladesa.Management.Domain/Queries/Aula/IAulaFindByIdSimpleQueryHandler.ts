import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneInputDto";
import type { AulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneOutputDto";

export interface IAulaFindByIdSimpleQueryHandler {
  execute(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;
}
