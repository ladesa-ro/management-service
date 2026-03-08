import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EtapaListInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaListInputDto";
import type { EtapaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaListOutputDto";

export interface IEtapaListQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: EtapaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<EtapaListOutputDto>;
}
