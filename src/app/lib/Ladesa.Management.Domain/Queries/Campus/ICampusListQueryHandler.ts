import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CampusListInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusListInputDto";
import type { CampusListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusListOutputDto";

export interface ICampusListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: CampusListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutputDto>;
}
