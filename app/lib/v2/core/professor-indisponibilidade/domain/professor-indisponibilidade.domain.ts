import { Usuario } from "../../usuario/domain/usuario.domain";

export class ProfessorIndisponibilidade {
  id!: string;
  perfil!: Usuario;
  diaDaSemana!: number;
  horaInicio!: string;
  horaFim!: string;
  motivo!: string;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
