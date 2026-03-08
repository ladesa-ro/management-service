import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { BlocoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneInputDto";
import type { BlocoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneOutputDto";

export interface IBlocoFindByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null>;
}
