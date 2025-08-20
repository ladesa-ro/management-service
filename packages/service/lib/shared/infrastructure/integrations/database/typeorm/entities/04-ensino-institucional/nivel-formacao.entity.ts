import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { type IDomain } from "@/shared/tsp/schema/typings";

@Entity("nivel_formacao")
export class NivelFormacaoEntity implements IDomain.NivelFormacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
