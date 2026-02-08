import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const GradeHorarioOfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "grade_horario_oferta_formacao",
  (db) => db.gradeHorarioOfertaFormacaoRepository,
);
