import { BlocoInputRef } from "@/modules/ambientes/bloco";
import { ImagemInputRef } from "@/modules/armazenamento/imagem";
import { AmbienteFields } from "../ambiente.fields";

export const AmbienteCreateCommandFields = {
  nome: AmbienteFields.nome,
  descricao: AmbienteFields.descricao,
  codigo: AmbienteFields.codigo,
  capacidade: AmbienteFields.capacidade,
  tipo: AmbienteFields.tipo,
  bloco: AmbienteFields.bloco,
};

export class AmbienteCreateCommand {
  nome!: string;
  descricao?: string | null;
  codigo!: string;
  capacidade?: number | null;
  tipo?: string | null;
  bloco!: BlocoInputRef;
  imagemCapa?: ImagemInputRef | null;
}
