// Novos helpers (create-mapper.ts)
export {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  type Mapper,
} from "./create-mapper";

// Helpers comuns
export * from "./transforms";

// ============================================================================
// @deprecated — Módulos legados abaixo serão removidos após migração completa
// ============================================================================

export * from "./base.mapper";

export {
  type BidirectionalField,
  type BidirectionalMapping,
  createBidirectionalMapping,
  createMapping,
  type FieldMapping,
  type Mapping,
  mapFilterCase,
} from "./field-mapper";

export { mapImagemOutput } from "./imagem-output.mapper";
