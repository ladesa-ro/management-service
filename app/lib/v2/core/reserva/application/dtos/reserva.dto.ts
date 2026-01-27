import { AmbienteFindOneOutput, AmbienteInputRef } from "../../../ambiente/application/dtos";
import { ObjectUuidRef, PaginationInput, PaginationMeta } from "../../../common/application/dtos";
import { UsuarioFindOneOutput, UsuarioInputRef } from "../../../usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ReservaFindOneInput {
  id!: string;
}

export class ReservaFindOneOutput {
  id!: string;

  situacao!: string;

  motivo!: string | null;

  tipo!: string | null;

  rrule!: string;

  ambiente!: AmbienteFindOneOutput;

  usuario!: UsuarioFindOneOutput;

  dateCreated!: Date;

  dateUpdated!: Date;

  dateDeleted!: Date | null;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ReservaListInput extends PaginationInput {
  "filter.id"?: string[];

  "filter.ambiente.id"?: string[];

  "filter.usuario.id"?: string[];
}

export class ReservaListOutput {
  meta!: PaginationMeta;
  data!: ReservaFindOneOutput[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

export class ReservaCreateInput {
  situacao!: string;

  motivo?: string | null;

  tipo?: string | null;

  rrule!: string;

  ambiente!: AmbienteInputRef;

  usuario!: UsuarioInputRef;
}

export class ReservaUpdateInput {
  situacao?: string;

  motivo?: string | null;

  tipo?: string | null;

  rrule?: string;

  ambiente?: AmbienteInputRef;

  usuario?: UsuarioInputRef;
}

// ============================================================================
// Input Ref
// ============================================================================

export class ReservaInputRef extends ObjectUuidRef {}
