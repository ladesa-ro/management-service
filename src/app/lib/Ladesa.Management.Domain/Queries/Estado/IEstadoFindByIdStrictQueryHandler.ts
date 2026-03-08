import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { EstadoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneInputDto";
import type { EstadoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/EstadoFindOneOutputDto";

export interface IEstadoFindByIdStrictQueryHandler {
  execute(
    accessContext: AccessContext,
    dto: EstadoFindOneInputDto,
  ): Promise<EstadoFindOneOutputDto>;
}
