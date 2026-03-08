import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisponibilidadeCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeCreateInputDto";
import type { DisponibilidadeFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneOutputDto";

export interface IDisponibilidadeCreateCommandHandler {
  execute(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto>;
}
