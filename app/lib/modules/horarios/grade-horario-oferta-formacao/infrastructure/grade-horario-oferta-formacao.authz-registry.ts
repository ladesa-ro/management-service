import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const GradeHorarioOfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "grade_horario_oferta_formacao",
  (db) => db.gradeHorarioOfertaFormacaoRepository,
);
