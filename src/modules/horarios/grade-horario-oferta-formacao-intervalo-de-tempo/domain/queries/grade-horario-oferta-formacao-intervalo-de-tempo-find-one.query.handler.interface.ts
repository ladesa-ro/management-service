import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto,
} from "../../application/dtos";

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler = IQueryHandler<
  IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQuery,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputDto | null
>;
export const IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler = Symbol(
  "IGradeHorarioOfertaFormacaoIntervaloDeTempoFindOneQueryHandler",
);
