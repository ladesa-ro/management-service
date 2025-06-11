using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/**
 * Visão completa de uma Imagem.
 */
model ImagemView {
  ...OmitProperties<Imagem, "versoes">;
  versoes: ImagemArquivoFindOneFromImagemResultView[];
}

/**
 * Dados de entrada para encontrar uma imagem por ID.
 */
model ImagemFindOneInputView {
  ...PickProperties<Imagem, "id">;
}

/**
 * Visão FindOne de uma imagem.
 */
model ImagemFindOneResultView {
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
model ImagemFindOneFromImagemArquivoResultView {
  ...PickProperties<ImagemView, "id">;
}
