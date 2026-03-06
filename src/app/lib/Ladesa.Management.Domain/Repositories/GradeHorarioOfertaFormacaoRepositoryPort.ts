import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { IGradeHorarioOfertaFormacao } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import type {
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
} from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao/application/dtos";

/**
 * Token de injecao para o repositorio de GradeHorarioOfertaFormacao
 */
export const GRADE_HORARIO_OFERTA_FORMACAO_REPOSITORY_PORT = Symbol(
  "IGradeHorarioOfertaFormacaoRepositoryPort",
);

/**
 * Port de saida para operacoes de persistencia de GradeHorarioOfertaFormacao
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IGradeHorarioOfertaFormacaoRepositoryPort
  extends IBaseCrudRepositoryPort<
    IGradeHorarioOfertaFormacao,
    GradeHorarioOfertaFormacaoListOutputDto,
    GradeHorarioOfertaFormacaoFindOneOutputDto
  > {}
