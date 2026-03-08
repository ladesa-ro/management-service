import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { TurmaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneInputDto";
import type { TurmaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneOutputDto";
import type { TurmaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaUpdateInputDto";

export interface ITurmaUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
  ): Promise<TurmaFindOneOutputDto>;
}
