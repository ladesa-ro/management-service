import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CampusFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneInputDto";

export interface ICampusDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: CampusFindOneInputDto): Promise<boolean>;
}
