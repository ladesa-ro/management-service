import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CursoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneInputDto";
import type { CursoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneOutputDto";

export interface ICursoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null>;
}
