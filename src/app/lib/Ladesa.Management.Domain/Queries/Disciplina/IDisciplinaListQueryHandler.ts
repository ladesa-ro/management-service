import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisciplinaListInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaListInputDto";
import type { DisciplinaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaListOutputDto";

export interface IDisciplinaListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto>;
}
