import { NivelFormacaoFields } from "../nivel-formacao.fields";

export const NivelFormacaoCreateCommandFields = {
  slug: NivelFormacaoFields.slug,
};

export class NivelFormacaoCreateCommand {
  slug!: string;
}
