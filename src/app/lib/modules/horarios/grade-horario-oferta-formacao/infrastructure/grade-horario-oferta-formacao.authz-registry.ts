import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createGradeHorarioOfertaFormacaoRepository } from "./persistence/typeorm/grade-horario-oferta-formacao.repository";

export const GradeHorarioOfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "grade_horario_oferta_formacao",
  (ds) => createGradeHorarioOfertaFormacaoRepository(ds),
);
