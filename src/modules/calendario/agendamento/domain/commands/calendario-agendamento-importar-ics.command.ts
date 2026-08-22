import type { ObjectUuidRef } from "@/domain/abstractions";

/**
 * Importa agendamentos a partir do conteúdo de um arquivo .ics (RFC 5545):
 * parseia cada VEVENT e cria um agendamento correspondente, um por um —
 * indisponível de campos que não têm correspondência no domínio.
 *
 * Idempotência: um VEVENT cujo UID é um UUID que já existe como
 * `identificadorExterno` de outro agendamento é pulado (não duplicado). UIDs
 * ausentes ou que não são UUID sempre geram um agendamento novo.
 *
 * O .ics externo não tem turma/diário/professor/ambiente do domínio
 * acadêmico — os agendamentos criados não têm nenhum desses vínculos.
 * `campus`/`colecao` são parâmetros do comando, não do arquivo, para que os
 * agendamentos importados fiquem no contexto certo.
 */
export class CalendarioAgendamentoImportarIcsCommand {
  conteudo!: string;
  campus?: ObjectUuidRef | null;
  colecao?: ObjectUuidRef | null;
}
