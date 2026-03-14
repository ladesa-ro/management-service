import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { CursoInputRef } from "@/modules/ensino/curso";

export class TurmaUpdateCommand {
  periodo?: string;
  curso?: CursoInputRef;
  ambientePadraoAula?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}
