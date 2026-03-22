import { createFieldMetadata } from "@/domain/abstractions";

export const OfertaFormacaoNivelFormacaoBulkReplaceCommandFields = {
  ofertaFormacaoId: createFieldMetadata({ description: "ID da oferta de formacao (uuid)" }),
  niveis: createFieldMetadata({
    description: "Lista de niveis de formacao para vincular a oferta de formacao",
  }),
  nivelFormacaoId: createFieldMetadata({ description: "ID do nivel de formacao (uuid)" }),
};

export class OfertaFormacaoNivelFormacaoBulkReplaceItem {
  nivelFormacaoId!: string;
}

export class OfertaFormacaoNivelFormacaoBulkReplaceCommand {
  ofertaFormacaoId!: string;
  niveis!: OfertaFormacaoNivelFormacaoBulkReplaceItem[];
}
