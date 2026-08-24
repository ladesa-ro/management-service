import type { ObjectUuidRef } from "@/domain/abstractions";
import { CalendarioColecaoAcessoFields } from "../calendario-colecao-acesso.fields";
import type {
  CalendarioColecaoAcessoEscopo,
  CalendarioColecaoAcessoPapel,
} from "../calendario-colecao-acesso.types";

export const CalendarioColecaoAcessoConcederCommandFields = {
  escopo: CalendarioColecaoAcessoFields.escopo,
  usuario: CalendarioColecaoAcessoFields.usuario,
  campus: CalendarioColecaoAcessoFields.campus,
  papel: CalendarioColecaoAcessoFields.papel,
};

export class CalendarioColecaoAcessoConcederCommand {
  colecaoId!: string;
  escopo!: CalendarioColecaoAcessoEscopo;
  usuario?: ObjectUuidRef | null;
  campus?: ObjectUuidRef | null;
  papel!: CalendarioColecaoAcessoPapel;
}
