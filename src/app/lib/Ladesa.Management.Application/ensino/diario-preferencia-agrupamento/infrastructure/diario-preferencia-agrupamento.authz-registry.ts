import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiarioPreferenciaAgrupamentoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/diario-preferencia-agrupamento/diario-preferencia-agrupamento.repository";

export const DiarioPreferenciaAgrupamentoAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_preferencia_agrupamento",
  (ds) => createDiarioPreferenciaAgrupamentoRepository(ds),
);
