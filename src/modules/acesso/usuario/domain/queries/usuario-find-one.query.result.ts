import { EntityQueryResult } from "@/domain/abstractions";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";

export class UsuarioFindOneQueryResult extends EntityQueryResult {
  nome!: string | null;
  matricula!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: ImagemFindOneQueryResult | null;
  imagemPerfil!: ImagemFindOneQueryResult | null;
}
