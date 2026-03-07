import type { AmbienteInputRefDto } from "./AmbienteInputRefDto";
import type { UsuarioInputRefDto } from "./UsuarioInputRefDto";

export class ReservaCreateInputDto {
  situacao!: string;
  motivo?: string | null;
  tipo?: string | null;
  rrule!: string;
  ambiente!: AmbienteInputRefDto;
  usuario!: UsuarioInputRefDto;
}
