import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CursoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneInputDto";
import type { CursoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneOutputDto";
import type { CursoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoUpdateInputDto";

export interface ICursoUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto>;
}
