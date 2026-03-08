import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EtapaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneOutputDto";

export interface IEtapaFindByIdSimpleQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<EtapaFindOneOutputDto | null>;
}
