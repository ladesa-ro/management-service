import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CursoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneInputDto";
import type { CursoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneOutputDto";

export interface ICursoFindByIdSimpleQueryHandler {
  execute(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null>;
}
