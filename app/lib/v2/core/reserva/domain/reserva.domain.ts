import { Ambiente } from "../../ambiente/domain/ambiente.domain";
import { Usuario } from "../../usuario/domain/usuario.domain";

export class Reserva {
  id!: string;
  situacao!: string;
  motivo!: string | null;
  tipo!: string | null;
  rrule!: string;
  ambiente!: Ambiente;
  usuario!: Usuario;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
