import type { IBaseCrudRepositoryPort } from "@/Ladesa.Management.Application/@shared";
import type { GradeHorarioOfertaFormacao } from "@/Ladesa.Management.Application/horarios/grade-horario-oferta-formacao";
import { type GradeHorarioOfertaFormacaoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoFindOneOutputDto";
import { type GradeHorarioOfertaFormacaoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/GradeHorarioOfertaFormacaoListOutputDto";

/**
 * Token de injecao para o repositorio de GradeHorarioOfertaFormacao
 */
export const IGradeHorarioOfertaFormacaoRepository = Symbol(
  "IGradeHorarioOfertaFormacaoRepository",
);

/**
 * Port de saida para operacoes de persistencia de GradeHorarioOfertaFormacao
 * Define o contrato que os adapters de persistencia devem implementar
 */
export interface IGradeHorarioOfertaFormacaoRepository
  extends IBaseCrudRepositoryPort<
    GradeHorarioOfertaFormacao,
    GradeHorarioOfertaFormacaoListOutputDto,
    GradeHorarioOfertaFormacaoFindOneOutputDto
  > {}
