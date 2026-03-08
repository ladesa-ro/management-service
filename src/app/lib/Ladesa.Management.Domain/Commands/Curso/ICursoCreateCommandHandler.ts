import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CursoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoCreateInputDto";
import type { CursoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneOutputDto";

export interface ICursoCreateCommandHandler {
  execute(accessContext: AccessContext, dto: CursoCreateInputDto): Promise<CursoFindOneOutputDto>;
}
