import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { TurmaListInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaListInputDto";
import type { TurmaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaListOutputDto";

export interface ITurmaListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: TurmaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutputDto>;
}
