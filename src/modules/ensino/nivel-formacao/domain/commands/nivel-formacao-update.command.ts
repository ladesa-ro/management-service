import { NivelFormacaoFields } from "../nivel-formacao.fields";

export const NivelFormacaoUpdateCommandFields = {
  nome: NivelFormacaoFields.nome,
  slug: NivelFormacaoFields.slug,
};

export class NivelFormacaoUpdateCommand {
  nome?: string;
  slug?: string;
}
