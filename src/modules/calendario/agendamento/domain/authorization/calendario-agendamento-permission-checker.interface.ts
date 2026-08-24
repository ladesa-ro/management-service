import type { IAccessContext, IPermissionChecker } from "@/domain/abstractions";

export const ICalendarioAgendamentoPermissionChecker = Symbol(
  "ICalendarioAgendamentoPermissionChecker",
);

export type ICalendarioAgendamentoPermissionChecker = IPermissionChecker & {
  ensureCanCancelarPropria(
    accessContext: IAccessContext | null,
    agendamentoId: string,
  ): Promise<void>;
};
