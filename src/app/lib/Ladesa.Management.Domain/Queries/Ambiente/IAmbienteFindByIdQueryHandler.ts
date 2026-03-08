import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { AmbienteFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneInputDto";
import type { AmbienteFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteFindOneOutputDto";

export interface IAmbienteFindByIdQueryHandler {
  execute(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AmbienteFindOneOutputDto | null>;
}
