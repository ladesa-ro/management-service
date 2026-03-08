import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CampusFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneInputDto";
import type { CampusFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneOutputDto";

export interface ICampusFindByIdQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: CampusFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto | null>;
}
