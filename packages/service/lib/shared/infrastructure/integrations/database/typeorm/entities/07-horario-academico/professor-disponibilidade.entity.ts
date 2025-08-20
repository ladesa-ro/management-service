import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PerfilEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities/03-autorizacao";
import { DisponibilidadeEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities/07-horario-academico/disponibilidade.entity";
import { type IDomain } from "@/shared/tsp/schema/typings";

@Entity("professor_disponibilidade")
export class ProfessorDisponibilidadeEntity implements IDomain.ProfessorDisponibilidade {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  //Chaves Estrangeiras

  @ManyToOne(() => PerfilEntity)
  @JoinColumn({ name: "id_perfil_fk" })
  perfil!: IDomain.Perfil;

  @ManyToOne(() => DisponibilidadeEntity)
  @JoinColumn({ name: "id_disponibilidade_fk" })
  disponibilidade!: IDomain.Disponibilidade;

  @Column({ name: "date_created", type: "timestamptz", nullable: false })
  dateCreated!: Date;

  @Column({ name: "date_updated", type: "timestamptz", nullable: false })
  dateUpdated!: Date;

  @Column({ name: "date_deleted", type: "timestamptz", nullable: true })
  dateDeleted!: null | Date;
}
