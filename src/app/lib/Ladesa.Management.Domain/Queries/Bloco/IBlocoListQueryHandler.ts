import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { BlocoListInputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoListInputDto";
import type { BlocoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoListOutputDto";

export interface IBlocoListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: BlocoListInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto>;
}
