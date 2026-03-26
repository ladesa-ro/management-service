export interface Mapper<I, O> {
  map(input: I): O;
  mapArray(inputs: I[]): O[];
}

export function createMapper<I, O>(mapFn: (input: I) => O): Mapper<I, O> {
  return {
    map: mapFn,

    mapArray(inputs: I[]): O[] {
      return inputs.map(mapFn);
    },
  };
}
