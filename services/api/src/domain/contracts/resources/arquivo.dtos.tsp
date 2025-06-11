namespace Ladesa.Domain.v4.Schemas;

/**
 * Visão completa de um arquivo.
 */
model ArquivoView {
  ...Arquivo;
}

/**
 * Dados de entrada para encontrar um arquivo por id.
 */
model ArquivoFindOneInputView {
  ...PickProperties<Arquivo, "id">;
}

/**
 * Dados de saída para encontrar um arquivo por id.
 */
model ArquivoFindOneResultView {
  ...PickProperties<ArquivoView, "id">;

  //

  ...PickProperties<
    ArquivoView,
    "name" | "mimeType" | "sizeBytes" | "storageType"
  >;

  //

  ...PickProperties<ArquivoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}
