import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EtapaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneInputDto";
import type { EtapaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneOutputDto";

export interface IEtapaFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EtapaFindOneOutputDto | null>;
}
