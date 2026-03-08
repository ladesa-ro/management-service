import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisciplinaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneInputDto";
import type { DisciplinaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaFindOneOutputDto";
import type { DisciplinaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/DisciplinaUpdateInputDto";

export interface IDisciplinaUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto>;
}
