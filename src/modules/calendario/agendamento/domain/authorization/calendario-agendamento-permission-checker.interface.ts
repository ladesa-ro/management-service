import type { IAccessContext, IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioAgendamentoPermissionChecker = Symbol(
  "ICalendarioAgendamentoPermissionChecker",
);

export type ICalendarioAgendamentoPermissionChecker = IPermissionChecker & {
  /**
   * Autoatendimento: além de quem já tem EDITOR na coleção, um professor
   * participante do próprio agendamento (perfil ativo presente em `perfis`)
   * também pode cancelar a própria ocorrência, sem precisar de EDITOR.
   * Restrito a cancelar — não vale para editar dados nem mover de coleção.
   */
  ensureCanCancelarPropria(
    accessContext: IAccessContext | null,
    agendamentoId: string,
  ): Promise<void>;
};
