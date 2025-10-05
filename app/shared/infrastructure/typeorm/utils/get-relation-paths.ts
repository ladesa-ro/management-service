/**
 * Esse método auxilia na construção de caminhos com base na array de seleção.
 *
 * Exemplo:
 * 1) Entrada: ["id"] | Saída: []
 * 2) Entrada: ["id", "cidade.id", "cidade.estado.id"] | Saída: ["cidade", "cidade.estado"]
 * 3) Entrada: ["id", "cidade.estado.nome"] | Saída: ["cidade", "cidade.estado"]
 *
 * @param {string[]} selections  A array de seleção deve ser confiável e estar validada corretamente.
 * @returns {string[]} Array de caminhos das relações.
 */

export const getRelationPaths = (selections: string[]) => {
  const relationsPaths = new Set<string>();

  for (const selection of selections) {
    const parts = selection.split(".");

    if (parts.length <= 1) continue;

    for (let depth = 1; depth < parts.length; depth++) {
      relationsPaths.add(parts.slice(0, depth).join("."));
    }
  }

  return Array.from(relationsPaths).sort((a, b) => a.split(".").length - b.split(".").length);
};
