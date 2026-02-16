import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createDiarioPreferenciaAgrupamentoRepository } from "./persistence/typeorm/diario-preferencia-agrupamento.repository";

export const DiarioPreferenciaAgrupamentoAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_preferencia_agrupamento",
  (ds) => createDiarioPreferenciaAgrupamentoRepository(ds),
);
