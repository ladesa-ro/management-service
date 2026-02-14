import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const DiarioPreferenciaAgrupamentoAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_preferencia_agrupamento",
  (db) => db.diarioPreferenciaAgrupamentoRepository,
);
