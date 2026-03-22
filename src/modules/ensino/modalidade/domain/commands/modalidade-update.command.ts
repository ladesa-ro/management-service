import { ModalidadeFields } from "../modalidade.fields";

export const ModalidadeUpdateCommandFields = {
  nome: ModalidadeFields.nome,
  slug: ModalidadeFields.slug,
};

export class ModalidadeUpdateCommand {
  nome?: string;
  slug?: string;
}
