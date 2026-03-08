import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { TurmaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneInputDto";
import type { TurmaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneOutputDto";

export interface ITurmaFindByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null>;
}
