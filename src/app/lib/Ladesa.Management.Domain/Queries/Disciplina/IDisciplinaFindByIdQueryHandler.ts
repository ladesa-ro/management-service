import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisciplinaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneInputDto";
import type { DisciplinaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneOutputDto";

export interface IDisciplinaFindByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;
}
