import { createFieldMetadata } from "@/domain/abstractions";

export const PerfilVinculosFiltroQueryFields = {
  campusId: createFieldMetadata({ description: "Filtro por ID de campus", nullable: true }),
  cargoNome: createFieldMetadata({
    description: "Filtro por nome do cargo (ex: aluno, professor)",
    nullable: true,
  }),
  cursoId: createFieldMetadata({ description: "Filtro por ID do curso", nullable: true }),
};

export class PerfilVinculosFiltroQuery {
  campusId?: string;
  cargoNome?: string;
  cursoId?: string;
}
