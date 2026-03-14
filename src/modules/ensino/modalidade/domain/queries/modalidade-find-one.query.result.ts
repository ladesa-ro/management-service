import { EntityQueryResult } from "@/domain/abstractions";

export class ModalidadeFindOneQueryResult extends EntityQueryResult {
  nome!: string;
  slug!: string;
}
