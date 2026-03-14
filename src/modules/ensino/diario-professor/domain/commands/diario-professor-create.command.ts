import { PerfilInputRef } from "@/modules/acesso/perfil";
import { DiarioInputRef } from "@/modules/ensino/diario";

export class DiarioProfessorCreateCommand {
  situacao!: boolean;
  diario!: DiarioInputRef;
  perfil!: PerfilInputRef;
}
