import { BlocoInputRef } from "@/modules/ambientes/bloco";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";

export class AmbienteCreateCommand {
  nome!: string;
  descricao?: string | null;
  codigo!: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco!: BlocoInputRef;
  imagemCapa?: ImagemInputRef | null;
}
