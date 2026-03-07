import type { AmbienteInputRefDto } from "./AmbienteInputRefDto";
import type { UsuarioInputRefDto } from "./UsuarioInputRefDto";

export class ReservaUpdateInputDto {
  situacao?: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule?: string;
  ambiente?: AmbienteInputRefDto;
  usuario?: UsuarioInputRefDto;
}
