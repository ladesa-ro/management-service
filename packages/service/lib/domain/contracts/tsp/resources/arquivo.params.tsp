namespace Ladesa.ManagementService.Domain.Contracts;

/**
 * Visão completa de um arquivo.
 */
model ArquivoView {
  ...Arquivo;
}

/**
 * Dados de entrada para encontrar um arquivo por id.
 */
model ArquivoFindOneInput {
  ...PickProperties<Arquivo, "id">;
}

/**
 * Dados de saída para encontrar um arquivo por id.
 */
model ArquivoFindOneOutput {
  ...PickProperties<ArquivoView, "id">;


  ...PickProperties<
    ArquivoView,
    "name" | "mimeType" | "sizeBytes" | "storageType"
  >;


  ...PickProperties<ArquivoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}
