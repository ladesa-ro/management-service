import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import type { DisponibilidadeFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/DisponibilidadeFindOneInputDto";

export interface IDisponibilidadeDeleteCommandHandler {
  execute(accessContext: AccessContext, dto: DisponibilidadeFindOneInputDto): Promise<boolean>;
}
