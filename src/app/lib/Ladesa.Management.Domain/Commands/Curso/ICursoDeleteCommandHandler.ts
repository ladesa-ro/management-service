import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CursoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CursoFindOneInputDto";

export interface ICursoDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: CursoFindOneInputDto): Promise<boolean>;
}
