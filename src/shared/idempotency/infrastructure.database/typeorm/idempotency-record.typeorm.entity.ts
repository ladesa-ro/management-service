import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("idempotency_record")
export class IdempotencyRecordTypeormEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "chave", type: "varchar", length: 255 })
  chave!: string;

  @Column({ name: "comando", type: "varchar", length: 255 })
  comando!: string;

  @Column({ name: "resultado", type: "jsonb" })
  resultado!: unknown;

  @Column({ name: "date_created", type: "timestamptz" })
  dateCreated!: string;
}
