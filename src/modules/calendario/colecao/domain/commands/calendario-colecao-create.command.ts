import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioColecaoFields } from "../calendario-colecao.fields";
import type { CalendarioColecaoVisibilidade } from "../calendario-colecao.types";

export const CalendarioColecaoCreateCommandFields = {
  campus: CalendarioColecaoFields.campus,
  nome: CalendarioColecaoFields.nome,
  cor: CalendarioColecaoFields.cor,
  visibilidade: CalendarioColecaoFields.visibilidade,
};

export class CalendarioColecaoCreateCommand {
  campus?: ObjectUuidRef | null;
  nome!: string;
  cor?: string | null;
  visibilidade?: CalendarioColecaoVisibilidade;
}
