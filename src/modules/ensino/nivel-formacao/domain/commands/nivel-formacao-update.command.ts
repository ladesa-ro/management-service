import { NivelFormacaoFields } from "../nivel-formacao.fields";

export const NivelFormacaoUpdateCommandFields = {
  slug: NivelFormacaoFields.slug,
};

export class NivelFormacaoUpdateCommand {
  slug?: string;
}
