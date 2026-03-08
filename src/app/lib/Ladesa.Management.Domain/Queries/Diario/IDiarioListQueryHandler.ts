import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiarioListInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioListInputDto";
import type { DiarioListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioListOutputDto";

export interface IDiarioListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto>;
}
