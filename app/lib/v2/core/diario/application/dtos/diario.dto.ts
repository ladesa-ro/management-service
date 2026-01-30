import { ObjectUuidRef, PaginationInput, PaginationMeta } from "@/core/@shared/application/dtos";
import {
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoInputRef,
} from "@/core/calendario-letivo";
import { DisciplinaFindOneOutput, DisciplinaInputRef } from "@/core/disciplina/application/dtos";
import { ImagemFindOneOutput, ImagemInputRef } from "@/core/imagem";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/core/ambiente";
import { TurmaFindOneOutput, TurmaInputRef } from "../../../turma/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class DiarioFindOneInput {
  id!: string;
}

export class DiarioFindOneOutput {
  id!: string;

  ativo!: boolean;

  calendarioLetivo!: CalendarioLetivoFindOneOutput;

  turma!: TurmaFindOneOutput;

  disciplina!: DisciplinaFindOneOutput;

  ambientePadrao!: AmbienteFindOneOutput | null;

  imagemCapa!: ImagemFindOneOutput | null;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class DiarioListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.turma.id"?: string[];

  "filter.disciplina.id"?: string[];

  "filter.calendarioLetivo.id"?: string[];
}

export class DiarioListOutput {
  meta!: PaginationMeta;
  data!: DiarioFindOneOutput[];
}

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

export class DiarioInputRef extends ObjectUuidRef {}
