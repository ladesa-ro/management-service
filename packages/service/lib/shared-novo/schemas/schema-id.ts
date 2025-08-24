const SchemaIdsEstado = {
  Estado: "Estado",

  EstadoFindOneByIdInput: "EstadoFindOneByIdInput",
  EstadoFindOneByIdOutput: "EstadoFindOneByIdOutput",

  EstadoListInput: "EstadoListInput",
  EstadoListOutput: "EstadoListOutput",
  EstadoListOutputItem: "EstadoListOutputItem",
} as const;

export const SchemaId = {
  ...SchemaIdsEstado,
} as const;

export type SchemaId = keyof typeof SchemaId;
