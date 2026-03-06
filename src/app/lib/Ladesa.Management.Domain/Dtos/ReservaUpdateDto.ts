import { IFindOneByIdDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/IFindOneByIdDto";
import { type Ambiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import { type Usuario } from "@/Ladesa.Management.Domain/Entities/Usuario";

/**
 * Interface para atualização de Reserva
 */
export interface ReservaUpdateDto {
  situacao?: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule?: string;
  ambiente?: IFindOneByIdDto<Ambiente["id"]>;
  usuario?: IFindOneByIdDto<Usuario["id"]>;
}
