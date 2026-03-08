import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EtapaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaCreateInputDto";
import type { EtapaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneOutputDto";

export interface IEtapaCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: EtapaCreateInputDto,
  ): Promise<EtapaFindOneOutputDto>;
}
