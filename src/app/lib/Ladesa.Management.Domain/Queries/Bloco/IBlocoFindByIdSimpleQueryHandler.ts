import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { BlocoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneOutputDto";

export interface IBlocoFindByIdSimpleQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto | null>;
}
