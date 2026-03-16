export class OfertaFormacaoNivelFormacaoBulkReplaceItem {
  nivelFormacaoId!: string;
}

export class OfertaFormacaoNivelFormacaoBulkReplaceCommand {
  ofertaFormacaoId!: string;
  niveis!: OfertaFormacaoNivelFormacaoBulkReplaceItem[];
}
