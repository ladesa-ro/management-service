export interface IIdempotencyRecord {
  id: string;
  chave: string;
  comando: string;
  resultado: unknown;
  dateCreated: string;
}
