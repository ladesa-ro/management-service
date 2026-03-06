import { Transform, type TransformFnParams } from "class-transformer";

/**
 * Transforma o valor em array se ele nao for um array.
 * Util para campos de filtro que podem receber um valor unico ou um array.
 */
export function TransformToArray(): PropertyDecorator {
  return Transform(({ value }: TransformFnParams) => {
    if (value === undefined || value === null) {
      return value;
    }
    return Array.isArray(value) ? value : [value];
  });
}
