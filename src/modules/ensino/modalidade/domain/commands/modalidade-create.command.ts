import { ModalidadeFields } from "../modalidade.fields";

export const ModalidadeCreateCommandFields = {
  nome: ModalidadeFields.nome,
  slug: ModalidadeFields.slug,
};

export class ModalidadeCreateCommand {
  nome!: string;
  slug!: string;
}
