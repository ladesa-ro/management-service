import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createDiaCalendarioRepository } from "./persistence/typeorm/dia-calendario.repository";

export const DiaCalendarioAuthzRegistrySetup = createAuthzRegistryProvider("dia_calendario", (ds) =>
  createDiaCalendarioRepository(ds),
);
