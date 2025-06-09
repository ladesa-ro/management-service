import { MigrationInterface, QueryRunner } from "typeorm";

const allCidades = [
  { id: 1100015, nome: "Alta Floresta D'Oeste", estado: { id: 11 } },
  { id: 1100023, nome: "Ariquemes", estado: { id: 11 } },
  { id: 1100031, nome: "Cabixi", estado: { id: 11 } },
  { id: 1100049, nome: "Cacoal", estado: { id: 11 } },
  { id: 1100056, nome: "Cerejeiras", estado: { id: 11 } },
  { id: 1100064, nome: "Colorado do Oeste", estado: { id: 11 } },
  { id: 1100072, nome: "Corumbiara", estado: { id: 11 } },
  { id: 1100080, nome: "Costa Marques", estado: { id: 11 } },
  { id: 1100098, nome: "Espigão D'Oeste", estado: { id: 11 } },
  { id: 1100106, nome: "Guajará-Mirim", estado: { id: 11 } },
  { id: 1100114, nome: "Jaru", estado: { id: 11 } },
  { id: 1100122, nome: "Ji-Paraná", estado: { id: 11 } },
  { id: 1100130, nome: "Machadinho D'Oeste", estado: { id: 11 } },
  { id: 1100148, nome: "Nova Brasilândia D'Oeste", estado: { id: 11 } },
  { id: 1100155, nome: "Ouro Preto do Oeste", estado: { id: 11 } },
  { id: 1100189, nome: "Pimenta Bueno", estado: { id: 11 } },
  { id: 1100205, nome: "Porto Velho", estado: { id: 11 } },
  { id: 1100254, nome: "Presidente Médici", estado: { id: 11 } },
  { id: 1100262, nome: "Rio Crespo", estado: { id: 11 } },
  { id: 1100288, nome: "Rolim de Moura", estado: { id: 11 } },
  { id: 1100296, nome: "Santa Luzia D'Oeste", estado: { id: 11 } },
  { id: 1100304, nome: "Vilhena", estado: { id: 11 } },
  { id: 1100320, nome: "São Miguel do Guaporé", estado: { id: 11 } },
  { id: 1100338, nome: "Nova Mamoré", estado: { id: 11 } },
  { id: 1100346, nome: "Alvorada D'Oeste", estado: { id: 11 } },
  { id: 1100379, nome: "Alto Alegre dos Parecis", estado: { id: 11 } },
  { id: 1100403, nome: "Alto Paraíso", estado: { id: 11 } },
  { id: 1100452, nome: "Buritis", estado: { id: 11 } },
  { id: 1100502, nome: "Novo Horizonte do Oeste", estado: { id: 11 } },
  { id: 1100601, nome: "Cacaulândia", estado: { id: 11 } },
  { id: 1100700, nome: "Campo Novo de Rondônia", estado: { id: 11 } },
  { id: 1100809, nome: "Candeias do Jamari", estado: { id: 11 } },
  { id: 1100908, nome: "Castanheiras", estado: { id: 11 } },
  { id: 1100924, nome: "Chupinguaia", estado: { id: 11 } },
  { id: 1100940, nome: "Cujubim", estado: { id: 11 } },
  { id: 1101005, nome: "Governador Jorge Teixeira", estado: { id: 11 } },
  { id: 1101104, nome: "Itapuã do Oeste", estado: { id: 11 } },
  { id: 1101203, nome: "Ministro Andreazza", estado: { id: 11 } },
  { id: 1101302, nome: "Mirante da Serra", estado: { id: 11 } },
  { id: 1101401, nome: "Monte Negro", estado: { id: 11 } },
  { id: 1101435, nome: "Nova União", estado: { id: 11 } },
  { id: 1101450, nome: "Parecis", estado: { id: 11 } },
  { id: 1101468, nome: "Pimenteiras do Oeste", estado: { id: 11 } },
  { id: 1101476, nome: "Primavera de Rondônia", estado: { id: 11 } },
  { id: 1101484, nome: "São Felipe D'Oeste", estado: { id: 11 } },
  { id: 1101492, nome: "São Francisco do Guaporé", estado: { id: 11 } },
  { id: 1101500, nome: "Seringueiras", estado: { id: 11 } },
  { id: 1101559, nome: "Teixeirópolis", estado: { id: 11 } },
  { id: 1101609, nome: "Theobroma", estado: { id: 11 } },
  { id: 1101708, nome: "Urupá", estado: { id: 11 } },
  { id: 1101757, nome: "Vale do Anari", estado: { id: 11 } },
  { id: 1101807, nome: "Vale do Paraíso", estado: { id: 11 } },
];

const remainingCidades = allCidades;

export class InsertCidadesRondonia1710183669681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const cidade of remainingCidades) {
      await queryRunner.query(
        `INSERT INTO "base_cidade" ("id", "nome", "id_estado_fk") VALUES
          ($1, $2, $3);`,
        [cidade.id, cidade.nome, cidade.estado.id],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const cidade of remainingCidades) {
      await queryRunner.query(`DELETE FROM "base_cidade" WHERE "id" = $1;`, [cidade.id]);
    }
  }
}
