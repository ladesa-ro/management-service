import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createGradeHorarioOfertaFormacaoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/horarios/grade-horario-oferta-formacao/grade-horario-oferta-formacao.repository";

export const GradeHorarioOfertaFormacaoAuthzRegistrySetup = createAuthzRegistryProvider(
  "grade_horario_oferta_formacao",
  (ds) => createGradeHorarioOfertaFormacaoRepository(ds),
);
