import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CursoListInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoListInputDto";
import type { CursoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoListOutputDto";

export interface ICursoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: CursoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto>;
}
