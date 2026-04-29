import type { DataSource } from "typeorm";

import {
  cidades,
  enderecos,
  campus,
  modalidades,
  niveisFormacao,
  ofertasFormacao,
  cursos,
  turmas,
  cargos,
  usuarios,
  perfis,
  estagiarios,
  empresas,
  estagios,
  disciplinas,
  responsaveisEmpresa,
} from "./seed-data";

/**
 * Executa o seed de dados fictícios no banco de dados
 * Insere dados em ordem respeitando as dependências de foreign keys
 */
export async function runSeed(dataSource: DataSource): Promise<void> {
  if (!dataSource.isInitialized) {
    throw new Error("DataSource not initialized");
  }

  console.log("🌱 Iniciando seed de dados fictícios...\n");

  try {
    // 1. Cidades (sem dependências)
    console.log("📍 Inserindo cidades...");
    await dataSource.query(
      `INSERT INTO cidade (id, nome, estado, pais, date_created, date_updated, date_deleted)
       VALUES ${cidades.map((c) => `('${c.id}', '${c.nome}', '${c.estado}', '${c.pais}', '${c.dateCreated}', '${c.dateUpdated}', ${c.dateDeleted})`).join(", ")}`,
    );

    // 2. Endereços (dependem de cidades)
    console.log("📬 Inserindo endereços...");
    await dataSource.query(
      `INSERT INTO endereco (id, cep, logradouro, numero, bairro, complemento, ponto_referencia, id_cidade_fk, date_created, date_updated, date_deleted)
       VALUES ${enderecos
         .map(
           (e) =>
             `('${e.id}', '${e.cep}', '${e.logradouro}', ${e.numero}, '${e.bairro}', ${e.complemento ? `'${e.complemento}'` : "NULL"}, ${e.pontoReferencia ? `'${e.pontoReferencia}'` : "NULL"}, '${e.idCidadeFk}', '${e.dateCreated}', '${e.dateUpdated}', ${e.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 3. Campus (dependem de endereços)
    console.log("🏫 Inserindo campus...");
    await dataSource.query(
      `INSERT INTO campus (id, nome_fantasia, razao_social, apelido, cnpj, id_endereco_fk, date_created, date_updated, date_deleted)
       VALUES ${campus
         .map(
           (c) =>
             `('${c.id}', '${c.nomeFantasia}', '${c.razaoSocial}', '${c.apelido}', '${c.cnpj}', '${c.idEnderecoFk}', '${c.dateCreated}', '${c.dateUpdated}', ${c.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 4. Modalidades (sem dependências)
    console.log("📚 Inserindo modalidades...");
    await dataSource.query(
      `INSERT INTO modalidade (id, nome, slug, id_imagem_capa_fk, date_created, date_updated, date_deleted)
       VALUES ${modalidades
         .map(
           (m) =>
             `('${m.id}', '${m.nome}', '${m.slug}', ${m.idImagemCapaFk}, '${m.dateCreated}', '${m.dateUpdated}', ${m.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 5. Níveis de Formação (sem dependências)
    console.log("🎓 Inserindo níveis de formação...");
    await dataSource.query(
      `INSERT INTO nivel_formacao (id, nome, slug, id_imagem_capa_fk, date_created, date_updated, date_deleted)
       VALUES ${niveisFormacao
         .map(
           (nf) =>
             `('${nf.id}', '${nf.nome}', '${nf.slug}', ${nf.idImagemCapaFk}, '${nf.dateCreated}', '${nf.dateUpdated}', ${nf.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 6. Ofertas de Formação (dependem de modalidades e campus)
    console.log("📖 Inserindo ofertas de formação...");
    await dataSource.query(
      `INSERT INTO oferta_formacao (id, nome, apelido, duracao_periodo_em_meses, id_modalidade_fk, id_campus_fk, id_imagem_capa_fk, date_created, date_updated, date_deleted)
       VALUES ${ofertasFormacao
         .map(
           (of) =>
             `('${of.id}', '${of.nome}', '${of.apelido}', ${of.duracaoPeriodoEmMeses}, '${of.idModalidadeFk}', '${of.idCampusFk}', ${of.idImagemCapaFk}, '${of.dateCreated}', '${of.dateUpdated}', ${of.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 7. Cursos (dependem de campus e ofertas de formação)
    console.log("📝 Inserindo cursos...");
    await dataSource.query(
      `INSERT INTO curso (id, nome, nome_abreviado, quantidade_periodos, id_campus_fk, id_oferta_formacao_fk, id_imagem_capa_fk, date_created, date_updated, date_deleted)
       VALUES ${cursos
         .map(
           (c) =>
             `('${c.id}', '${c.nome}', '${c.nomeAbreviado}', ${c.quantidadePeriodos}, '${c.idCampusFk}', '${c.idOfertaFormacaoFk}', ${c.idImagemCapaFk}, '${c.dateCreated}', '${c.dateUpdated}', ${c.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 8. Turmas (dependem de cursos)
    console.log("👥 Inserindo turmas...");
    await dataSource.query(
      `INSERT INTO turma (id, periodo, nome, id_ambiente_padrao_aula_fk, id_curso_fk, id_imagem_capa_fk, date_created, date_updated, date_deleted)
       VALUES ${turmas
         .map(
           (t) =>
             `('${t.id}', '${t.periodo}', '${t.nome}', ${t.idAmbientePadraoAulaFk}, '${t.idCursoFk}', ${t.idImagemCapaFk}, '${t.dateCreated}', '${t.dateUpdated}', ${t.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 9. Cargos (sem dependências)
    console.log("💼 Inserindo cargos...");
    await dataSource.query(
      `INSERT INTO cargo (id, nome, descricao, date_created, date_updated, date_deleted)
       VALUES ${cargos
         .map(
           (c) =>
             `('${c.id}', '${c.nome}', '${c.descricao}', '${c.dateCreated}', '${c.dateUpdated}', ${c.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 10. Usuários (sem dependências de entities, apenas imagens que são nullable)
    console.log("👤 Inserindo usuários...");
    await dataSource.query(
      `INSERT INTO usuario (id, nome, matricula, email, is_super_user, id_imagem_capa_fk, id_imagem_perfil_fk, date_created, date_updated, date_deleted)
       VALUES ${usuarios
         .map(
           (u) =>
             `('${u.id}', '${u.nome}', '${u.matricula}', '${u.email}', ${u.isSuperUser}, ${u.idImagemCapaFk}, ${u.idImagemPerfilFk}, '${u.dateCreated}', '${u.dateUpdated}', ${u.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 11. Perfis (dependem de usuários, campus e cargos)
    console.log("🔐 Inserindo perfis...");
    await dataSource.query(
      `INSERT INTO perfil (id, ativo, id_cargo_fk, id_campus_fk, id_usuario_fk, date_created, date_updated, date_deleted)
       VALUES ${perfis
         .map(
           (p) =>
             `('${p.id}', ${p.ativo}, ${p.idCargoFk ? `'${p.idCargoFk}'` : "NULL"}, '${p.idCampusFk}', '${p.idUsuarioFk}', '${p.dateCreated}', '${p.dateUpdated}', ${p.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 12. Estagiários (dependem de perfis, cursos e turmas)
    console.log("🎯 Inserindo estagiários...");
    await dataSource.query(
      `INSERT INTO estagiario (id, id_perfil_fk, id_curso_fk, id_turma_fk, telefone, email_institucional, data_nascimento, date_created, date_updated, date_deleted)
       VALUES ${estagiarios
         .map(
           (e) =>
             `('${e.id}', '${e.idPerfilFk}', '${e.idCursoFk}', '${e.idTurmaFk}', '${e.telefone}', '${e.emailInstitucional}', '${e.dataNascimento}', '${e.dateCreated}', '${e.dateUpdated}', ${e.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 13. Empresas (dependem de endereços)
    console.log("🏢 Inserindo empresas...");
    await dataSource.query(
      `INSERT INTO empresa (id, razao_social, nome_fantasia, cnpj, telefone, email, id_endereco_fk, date_created, date_updated, date_deleted)
       VALUES ${empresas
         .map(
           (e) =>
             `('${e.id}', '${e.razaoSocial}', '${e.nomeFantasia}', '${e.cnpj}', '${e.telefone}', '${e.email}', '${e.idEnderecoFk}', '${e.dateCreated}', '${e.dateUpdated}', ${e.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 14. Estágios (dependem de empresas, estagiários e usuários)
    console.log("📋 Inserindo estágios...");
    await dataSource.query(
      `INSERT INTO estagio (id, id_empresa_fk, id_estagiario_fk, id_usuario_orientador_fk, carga_horaria, data_inicio, data_fim, status, nome_supervisor, email_supervisor, telefone_supervisor, aditivo, tipo_aditivo, date_created, date_updated, date_deleted)
       VALUES ${estagios
         .map(
           (e) =>
             `('${e.id}', '${e.idEmpresaFk}', ${e.idEstagiarioFk ? `'${e.idEstagiarioFk}'` : "NULL"}, ${e.idUsuarioOrientadorFk ? `'${e.idUsuarioOrientadorFk}'` : "NULL"}, ${e.cargaHoraria}, '${e.dataInicio}', '${e.dataFim}', '${e.status}', '${e.nomeSupervisor}', '${e.emailSupervisor}', '${e.telefoneSupervisor}', ${e.aditivo}, ${e.tipoAditivo ? `'${e.tipoAditivo}'` : "NULL"}, '${e.dateCreated}', '${e.dateUpdated}', ${e.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 15. Disciplinas (sem dependências externas principais)
    console.log("📕 Inserindo disciplinas...");
    await dataSource.query(
      `INSERT INTO disciplina (id, nome, nome_abreviado, carga_horaria, id_imagem_capa_fk, date_created, date_updated, date_deleted)
       VALUES ${disciplinas
         .map(
           (d) =>
             `('${d.id}', '${d.nome}', '${d.nomeAbreviado}', ${d.cargaHoraria}, ${d.idImagemCapaFk}, '${d.dateCreated}', '${d.dateUpdated}', ${d.dateDeleted})`,
         )
         .join(", ")}`,
    );

    // 16. Responsáveis de Empresa (dependem de empresas)
    console.log("👔 Inserindo responsáveis de empresa...");
    await dataSource.query(
      `INSERT INTO responsavel_empresa (id, nome, cargo, email, telefone, id_empresa_fk, date_created, date_updated, date_deleted)
       VALUES ${responsaveisEmpresa
         .map(
           (re) =>
             `('${re.id}', '${re.nome}', '${re.cargo}', '${re.email}', '${re.telefone}', '${re.idEmpresaFk}', '${re.dateCreated}', '${re.dateUpdated}', ${re.dateDeleted})`,
         )
         .join(", ")}`,
    );

    console.log("\n✅ Seed executado com sucesso!");
    console.log(`
📊 Resumo dos dados inseridos:
  - ${cidades.length} cidades
  - ${enderecos.length} endereços
  - ${campus.length} campus
  - ${modalidades.length} modalidades
  - ${niveisFormacao.length} níveis de formação
  - ${ofertasFormacao.length} ofertas de formação
  - ${cursos.length} cursos
  - ${turmas.length} turmas
  - ${cargos.length} cargos
  - ${usuarios.length} usuários
  - ${perfis.length} perfis
  - ${estagiarios.length} estagiários
  - ${empresas.length} empresas
  - ${estagios.length} estágios
  - ${disciplinas.length} disciplinas
  - ${responsaveisEmpresa.length} responsáveis de empresa
    `);
  } catch (error) {
    console.error("❌ Erro ao executar seed:", error);
    throw error;
  }
}
