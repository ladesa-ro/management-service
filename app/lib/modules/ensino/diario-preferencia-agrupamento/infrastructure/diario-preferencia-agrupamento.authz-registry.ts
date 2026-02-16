import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const DiarioPreferenciaAgrupamentoAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_preferencia_agrupamento",
  (db) => db.diarioPreferenciaAgrupamentoRepository,
);
