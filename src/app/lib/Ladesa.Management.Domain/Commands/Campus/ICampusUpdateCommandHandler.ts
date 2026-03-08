import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CampusFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneInputDto";
import type { CampusFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneOutputDto";
import type { CampusUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusUpdateInputDto";

export interface ICampusUpdateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto & CampusUpdateInputDto,
  ): Promise<CampusFindOneOutputDto>;
}
