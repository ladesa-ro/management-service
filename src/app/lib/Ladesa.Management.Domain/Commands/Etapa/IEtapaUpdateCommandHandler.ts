import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EtapaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneInputDto";
import type { EtapaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneOutputDto";
import type { EtapaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaUpdateInputDto";

export interface IEtapaUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: EtapaFindOneInputDto & EtapaUpdateInputDto,
  ): Promise<EtapaFindOneOutputDto>;
}
