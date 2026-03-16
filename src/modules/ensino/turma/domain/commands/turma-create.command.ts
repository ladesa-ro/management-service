import { AmbienteInputRef } from "@/modules/ambientes/ambiente";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { CursoInputRef } from "@/modules/ensino/curso";

export class TurmaCreateCommand {
  periodo!: string;
  nome?: string | null;
  curso!: CursoInputRef;
  ambientePadraoAula?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}
