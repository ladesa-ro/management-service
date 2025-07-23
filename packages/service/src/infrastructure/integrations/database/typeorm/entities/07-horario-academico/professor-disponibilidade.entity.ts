import { PerfilEntity } from "@/infrastructure/integrations/database/typeorm/entities/03-autorizacao";
import { DisponibilidadeEntity } from "@/infrastructure/integrations/database/typeorm/entities/07-horario-academico/disponibilidade.entity";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("professor_disponibilidade")
export class ProfessorDisponibilidadeEntity implements LadesaTypings.ProfessorDisponibilidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //Chaves Estrangeiras

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: LadesaTypings.Perfil;

  @ManyToOne(() => DisponibilidadeEntity)
  @JoinColumn({ name: "id_disponibilidade_fk" })
  disponibilidade!: LadesaTypings.Disponibilidade;

  //

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
