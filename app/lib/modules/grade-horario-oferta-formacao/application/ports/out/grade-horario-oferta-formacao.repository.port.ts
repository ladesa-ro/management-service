import type { IBaseCrudRepositoryPort } from "@/modules/@shared";
import type { GradeHorarioOfertaFormacaoEntity } from "@/modules/grade-horario-oferta-formacao/infrastructure/persistence/typeorm";
import type {
  GradeHorarioOfertaFormacaoFindOneOutputDto,
  GradeHorarioOfertaFormacaoListOutputDto,
} from "../../dtos";

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
    GradeHorarioOfertaFormacaoEntity,
    GradeHorarioOfertaFormacaoListOutputDto,
    GradeHorarioOfertaFormacaoFindOneOutputDto
  > {}
