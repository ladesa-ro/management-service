import type { ObjectUuidRef } from "@/domain/abstractions";

export class CalendarioAgendamentoImportarIcsCommand {
  conteudo!: string;
  campus?: ObjectUuidRef | null;
  colecao?: ObjectUuidRef | null;
}
