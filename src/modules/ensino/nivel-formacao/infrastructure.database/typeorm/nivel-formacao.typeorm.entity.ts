import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("nivel_formacao")
export class NivelFormacaoEntity {
  @PrimaryColumn("uuid")
  id!: string;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: string;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: string;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: string | null;
}
