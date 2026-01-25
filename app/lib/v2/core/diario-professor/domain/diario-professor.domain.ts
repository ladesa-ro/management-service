import { Diario } from "../../diario/domain/diario.domain";
import { Perfil } from "../../perfil/domain/perfil.domain";

export class DiarioProfessor {
  id!: string;
  situacao!: boolean;
  diario!: Diario;
  perfil!: Perfil;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
