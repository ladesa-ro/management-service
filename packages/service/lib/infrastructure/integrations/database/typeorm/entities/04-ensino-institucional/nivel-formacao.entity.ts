import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("nivel_formacao")
export class NivelFormacaoEntity implements LadesaTypings.NivelFormacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
