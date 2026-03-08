import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EtapaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EtapaFindOneInputDto";

export interface IEtapaDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: EtapaFindOneInputDto): Promise<boolean>;
}
