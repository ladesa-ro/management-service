import type { Diario } from "@/v2/core/diario/domain/diario.domain";
import type { Perfil } from "@/v2/core/perfil/domain/perfil.domain";
import type { IDiarioProfessor, IDiarioProfessorCreate } from "./diario-professor.types";

export class DiarioProfessor implements IDiarioProfessor {
  id!: string;
  situacao!: boolean;
  diario!: Diario;
  perfil!: Perfil;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  static criar(dados: IDiarioProfessorCreate): DiarioProfessor {
    const diarioProfessor = new DiarioProfessor();
    diarioProfessor.situacao = dados.situacao;
    return diarioProfessor;
  }

  static fromData(dados: IDiarioProfessor): DiarioProfessor {
    const diarioProfessor = new DiarioProfessor();
    Object.assign(diarioProfessor, dados);
    return diarioProfessor;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
