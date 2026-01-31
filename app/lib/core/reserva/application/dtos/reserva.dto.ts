import {
  EntityOutput,
  FindOneInput,
  IFilterAcceptableValues,
  ObjectUuidRef,
  PaginationInput,
  PaginationResult,
} from "@/core/@shared/application/dtos";
import { AmbienteFindOneOutput, AmbienteInputRef } from "@/core/ambiente";
import { UsuarioFindOneOutput, UsuarioInputRef } from "@/core/usuario/application/dtos";

// ============================================================================
// FindOne Input/Output
// ============================================================================

export class ReservaFindOneInput extends FindOneInput {}

export class ReservaFindOneOutput extends EntityOutput {
  situacao!: string;
  motivo!: string | null;
  tipo!: string | null;
  rrule!: string;
  ambiente!: AmbienteFindOneOutput;
  usuario!: UsuarioFindOneOutput;
}

// ============================================================================
// List Input/Output
// ============================================================================

export class ReservaListInput extends PaginationInput {
  "filter.id"?: IFilterAcceptableValues;
  "filter.ambiente.id"?: IFilterAcceptableValues;
  "filter.usuario.id"?: IFilterAcceptableValues;
}

export class ReservaListOutput extends PaginationResult<ReservaFindOneOutput> {}

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

export type ReservaInputRef = ObjectUuidRef;
