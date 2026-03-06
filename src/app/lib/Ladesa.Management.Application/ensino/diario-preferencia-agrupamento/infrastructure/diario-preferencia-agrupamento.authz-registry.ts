import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiarioPreferenciaAgrupamentoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/DiarioPreferenciaAgrupamentoRepository";

export const DiarioPreferenciaAgrupamentoAuthzRegistrySetup = createAuthzRegistryProvider(
  "diario_preferencia_agrupamento",
  (ds) => createDiarioPreferenciaAgrupamentoRepository(ds),
);
