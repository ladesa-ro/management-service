import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertCampusIfroJipa1710183866989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "endereco"
        ("id", "cep", "logradouro", "numero", "bairro", "complemento", "ponto_referencia", "id_cidade_fk")
      VALUES
      (
        'f4a4c263-7499-42a5-94a7-09d436ed5110',
        '76900-730',
        'Av. Monte Castelo',
        151,
        'Jardim dos Migrantes',
        NULL,
        NULL,
        1100122
      );
    `);

    await queryRunner.query(`
        INSERT INTO "campus"
          ("id", "razao_social", "nome_fantasia", "apelido", "cnpj", "id_endereco_fk", "date_created")
        VALUES
          (
            '50987cbb-01a2-4345-8974-cae554ffca51',
            'INSTITUTO FEDERAL DE RONDONIA - CAMPUS JI-PARANA',
            'INSTITUTO FEDERAL DE EDUCACAO, CIENCIA E TECNOLOGIA DE RONDONIA',
            'IFRO - Campus Ji-Paraná',
            '10817343000288',
            'f4a4c263-7499-42a5-94a7-09d436ed5110',
            '2024-02-12T15:21:07.801Z'
          );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM campus WHERE id = '50987cbb-01a2-4345-8974-cae554ffca51';`);

    await queryRunner.query(`DELETE FROM endereco WHERE id = 'f4a4c263-7499-42a5-94a7-09d436ed5110';`);
  }
}
