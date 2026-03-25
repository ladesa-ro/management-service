export const IUsuarioAvailabilityChecker = Symbol("IUsuarioAvailabilityChecker");

export type IUsuarioAvailabilityChecker = {
  ensureAvailable(
    dto: { email?: string | null; matricula?: string | null },
    excludeUsuarioId?: string | null,
  ): Promise<void>;
};
