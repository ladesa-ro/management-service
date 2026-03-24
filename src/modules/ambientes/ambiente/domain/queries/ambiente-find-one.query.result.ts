import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { BlocoFindOneQueryResult } from "@/modules/ambientes/bloco";
import { ImagemFindOneQueryResult } from "@/modules/armazenamento/imagem";
import { AmbienteFields } from "../ambiente.fields";

export const AmbienteFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...AmbienteFields,
};

export class AmbienteFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: BlocoFindOneQueryResult;
  imagemCapa!: ImagemFindOneQueryResult | null;
}
