import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { TurmaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneInputDto";
import type { TurmaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneOutputDto";

export interface ITurmaFindByIdSimpleQueryHandler {
  execute(
    accessContext: AccessContext,
    id: TurmaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto | null>;
}
