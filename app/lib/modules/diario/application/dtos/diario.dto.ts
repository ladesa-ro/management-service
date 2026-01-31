import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/modules/@shared/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/modules/ambiente";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "@/modules/calendario-letivo";
import { DisciplinaFindOneOutput, DisciplinaInputRef } from "@/modules/disciplina/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "@/modules/imagem";
import { TurmaFindOneOutput, TurmaInputRef } from "@/modules/turma";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioFindOneInput extends FindOneInput {}

export class DiarioFindOneOutput extends EntityOutput {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoFindOneOutput;
  turma!: TurmaFindOneOutput;
  disciplina!: DisciplinaFindOneOutput;
  ambientePadrao!: AmbienteFindOneOutput | null;
  imagemCapa!: ImagemFindOneOutput | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.turma.id"?: IFilterAcceptableValues;
  "filter.disciplina.id"?: IFilterAcceptableValues;
  "filter.calendarioLetivo.id"?: IFilterAcceptableValues;
}

export class DiarioListOutput extends PaginationResult<DiarioFindOneOutput> {}

// ============================================================================
// Create/Update Input
// ============================================================================

export class DiarioCreateInput {
  ativo!: boolean;
  calendarioLetivo!: CalendarioLetivoInputRef;
  turma!: TurmaInputRef;
  disciplina!: DisciplinaInputRef;
  ambientePadrao?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}

export class DiarioUpdateInput {
  ativo?: boolean;
  calendarioLetivo?: CalendarioLetivoInputRef;
  turma?: TurmaInputRef;
  disciplina?: DisciplinaInputRef;
  ambientePadrao?: AmbienteInputRef | null;
  imagemCapa?: ImagemInputRef | null;
}

// ============================================================================
// Input Ref
// ============================================================================

export type DiarioInputRef = ObjectUuidRef;
