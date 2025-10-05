const SchemaIdsEstado = {
  Estado: "Estado",

  EstadoFindOneByIdInput: "EstadoFindOneByIdInput",
  EstadoFindOneByIdOutput: "EstadoFindOneByIdOutput",

  EstadoListInput: "EstadoListInput",
  EstadoListOutput: "EstadoListOutput",
  EstadoListOutputItem: "EstadoListOutputItem",
} as const;

const SchemaIdsCidade = {
  Cidade: "Cidade",

  CidadeFindOneByIdInput: "CidadeFindOneByIdInput",
  CidadeFindOneByIdOutput: "CidadeFindOneByIdOutput",

  CidadeListInput: "CidadeListInput",
  CidadeListOutput: "CidadeListOutput",
  CidadeListOutputItem: "CidadeListOutputItem",
} as const;

export const SchemaId = {
  ...SchemaIdsEstado,
  ...SchemaIdsCidade,
} as const;

export type SchemaId = keyof typeof SchemaId;
