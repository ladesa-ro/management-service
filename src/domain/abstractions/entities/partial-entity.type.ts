export type PartialEntity<T> = {
  [P in keyof T]?: PartialEntity<T[P]> | T[P];
};
