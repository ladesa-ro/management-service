import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisciplinaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneInputDto";

export interface IDisciplinaDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: DisciplinaFindOneInputDto): Promise<boolean>;
}
