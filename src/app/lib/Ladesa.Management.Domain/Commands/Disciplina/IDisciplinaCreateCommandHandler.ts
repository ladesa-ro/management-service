import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisciplinaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaCreateInputDto";
import type { DisciplinaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneOutputDto";

export interface IDisciplinaCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto>;
}
