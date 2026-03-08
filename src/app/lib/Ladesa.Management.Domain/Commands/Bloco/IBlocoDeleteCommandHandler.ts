import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { BlocoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/BlocoFindOneInputDto";

export interface IBlocoDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: BlocoFindOneInputDto): Promise<boolean>;
}
