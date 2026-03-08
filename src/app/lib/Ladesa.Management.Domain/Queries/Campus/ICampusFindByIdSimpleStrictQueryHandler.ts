import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { CampusFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneOutputDto";

export interface ICampusFindByIdSimpleStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutputDto>;
}
