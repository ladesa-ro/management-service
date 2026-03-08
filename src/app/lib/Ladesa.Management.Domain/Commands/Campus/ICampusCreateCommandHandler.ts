import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CampusCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusCreateInputDto";
import type { CampusFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneOutputDto";

export interface ICampusCreateCommandHandler {
  execute(accessContext: AccessContext, dto: CampusCreateInputDto): Promise<CampusFindOneOutputDto>;
}
