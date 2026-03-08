import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AulaListInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaListInputDto";
import type { AulaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaListOutputDto";

export interface IAulaListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: AulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto>;
}
