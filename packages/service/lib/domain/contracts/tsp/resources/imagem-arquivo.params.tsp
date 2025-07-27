using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/**
 * Visão completa de uma versão de uma imagem.
 */
model ImagemArquivoView {
  ...OmitProperties<ImagemArquivo, "imagem" | "arquivo">;
  imagem: ImagemFindOneFromImagemArquivoOutput;
  arquivo: ArquivoFindOneOutput;
}

/**
 * Dados de entrada para encontrar uma versão de uma imagem por ID.
 */
model ImagemArquivoFindOneInput {
  ...PickProperties<Imagem, "id">;
}

/**
 * Visão FindOne de uma versão de uma versão de imagem.
 */
model ImagemArquivoFindOneOutput {
  ...PickProperties<ImagemArquivoView, "id">;


  ...PickProperties<
    ImagemArquivoView,
    "largura" | "altura" | "formato" | "mimeType"
  >;

  ...PickProperties<ImagemArquivoView, "imagem">;
  ...PickProperties<ImagemArquivoView, "arquivo">;


  ...PickProperties<
    ImagemArquivoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/**
 * Visão FindOneFromImagem de uma versão de imagem.
 */
model ImagemArquivoFindOneFromImagemOutput {
  ...PickProperties<ImagemArquivoView, "id">;


  ...PickProperties<
    ImagemArquivoView,
    "largura" | "altura" | "formato" | "mimeType"
  >;

  ...PickProperties<ImagemArquivoView, "arquivo">;


  ...PickProperties<
    ImagemArquivoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}
