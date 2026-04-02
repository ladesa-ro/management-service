import { NivelFormacaoFields } from "../nivel-formacao.fields";

export const NivelFormacaoCreateCommandFields = {
  nome: NivelFormacaoFields.nome,
  slug: NivelFormacaoFields.slug,
};

export class NivelFormacaoCreateCommand {
  nome!: string;
  slug!: string;
}
