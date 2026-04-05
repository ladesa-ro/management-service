import { BadRequestException } from "@nestjs/common";

/**
 * Valida que nenhum par de etapas possui datas sobrepostas.
 *
 * Lanca BadRequestException caso haja sobreposicao.
 */

export function validateEtapasNaoSobrepostas(
  etapas: ReadonlyArray<{ dataInicio: string; dataTermino: string }>,
): void {
  for (let i = 0; i < etapas.length; i++) {
    for (let j = i + 1; j < etapas.length; j++) {
      const a = etapas[i];
      const b = etapas[j];

      if (a.dataInicio <= b.dataTermino && b.dataInicio <= a.dataTermino) {
        throw new BadRequestException(
          `As etapas ${i + 1} e ${j + 1} possuem datas sobrepostas. ` +
            `Etapa ${i + 1}: ${a.dataInicio} a ${a.dataTermino}, ` +
            `Etapa ${j + 1}: ${b.dataInicio} a ${b.dataTermino}.`,
        );
      }
    }
  }
}
