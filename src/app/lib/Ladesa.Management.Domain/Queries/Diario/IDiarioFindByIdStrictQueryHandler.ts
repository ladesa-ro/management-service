import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DiarioFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneInputDto";
import type { DiarioFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DiarioFindOneOutputDto";

export interface IDiarioFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto>;
}
