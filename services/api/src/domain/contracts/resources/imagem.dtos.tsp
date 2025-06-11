using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/**
 * Visão completa de uma Imagem.
 */
model ImagemView {
  ...OmitProperties<Imagem, "versoes">;
  versoes: ImagemArquivoFindOneFromImagemOutput[];
}

/**
 * Dados de entrada para encontrar uma imagem por ID.
 */
model ImagemFindOneInput {
  ...PickProperties<Imagem, "id">;
}

/**
 * Visão FindOne de uma imagem.
 */
model ImagemFindOneOutput {
  //
  ...PickProperties<ImagemView, "id">;

  ...PickProperties<ImagemView, "descricao">;
  ...PickProperties<ImagemView, "versoes">;

  //
  ...PickProperties<ImagemView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/**
 * Visão FindOneFromImagemArquivo de uma imagem.
 */
model ImagemFindOneFromImagemArquivoOutput {
  ...PickProperties<ImagemView, "id">;
}
