// @ts-nocheck
import { DataSource } from "typeorm";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { DataSourceAppFactory } from "../src/infrastructure.database/data-sources/factories/data-source-app-factory";
import { EmpresaTypeormEntity } from "../src/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";
import { EstagiarioTypeormEntity } from "../src/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import { EstagioTypeormEntity } from "../src/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";
import { PerfilEntity } from "../src/modules/acesso/usuario/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import { CursoEntity } from "../src/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";
import { EnderecoEntity } from "../src/modules/localidades/endereco/infrastructure.database/typeorm/endereco.typeorm.entity";
import { CampusEntity } from "../src/modules/ambientes/campus/infrastructure.database/typeorm/campus.typeorm.entity";
import { EstagioStatus } from "../src/modules/estagio/estagio/domain/estagio";

function loadEnv(): void {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2];
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  }
}

function makeDbOptions() {
  return {
    url: process.env.DATABASE_URL,
    useSSL: process.env.DATABASE_USE_SSL ?? "false",
    schema: undefined,
  };
}

async function run() {
  loadEnv();
  const opts = makeDbOptions();
  if (!opts.url) {
    console.error("DATABASE_URL not set in env");
    process.exit(1);
  }

  console.log("Conectando ao banco de dados...");
  const dsOpts = DataSourceAppFactory.fromOptions(opts);
  const dataSource = new DataSource(dsOpts as any);
  await dataSource.initialize();
  console.log("Conectado!");

  // Buscar dependências
  const perfilRepo = dataSource.getRepository(PerfilEntity);
  const cursoRepo = dataSource.getRepository(CursoEntity);
  const enderecoRepo = dataSource.getRepository(EnderecoEntity);
  const campusRepo = dataSource.getRepository(CampusEntity);

  let campus = await campusRepo.findOne({ where: {} });
  if (!campus) {
    campus = campusRepo.create({
      id: crypto.randomUUID(),
      nome: "Campus Principal",
      cnpj: "00000000000000",
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    });
    await campusRepo.save(campus);
    console.log(`✅ Campus inserido`);
  }

  let endereco = await enderecoRepo.findOne({ where: {} });
  if (!endereco) {
    endereco = enderecoRepo.create({
      id: crypto.randomUUID(),
      logradouro: "Rua Teste",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01001-000",
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    });
    await enderecoRepo.save(endereco);
    console.log(`✅ Endereco inserido`);
  }

  let curso = await cursoRepo.findOne({ where: {} });
  if (!curso) {
    curso = cursoRepo.create({
      id: crypto.randomUUID(),
      nome: "Engenharia de Software",
      campus: campus,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    });
    await cursoRepo.save(curso);
    console.log(`✅ Curso inserido`);
  }

  // We need a Usuario for the Perfil
  const { UsuarioEntity } = require("../src/modules/acesso/usuario/infrastructure.database/typeorm/usuario.typeorm.entity");
  const usuarioRepo = dataSource.getRepository(UsuarioEntity);
  let usuario = await usuarioRepo.findOne({ where: {} });
  if (!usuario) {
    usuario = usuarioRepo.create({
      id: crypto.randomUUID(),
      nome: "Aluno Teste",
      email: "aluno@teste.com",
      keycloakId: crypto.randomUUID(),
      matricula: "2024001",
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    });
    await usuarioRepo.save(usuario);
    console.log(`✅ Usuario inserido`);
  }

  let perfil = await perfilRepo.findOne({ where: {} });
  if (!perfil) {
    perfil = perfilRepo.create({
      id: crypto.randomUUID(),
      usuario: usuario,
      campus: campus,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
    });
    await perfilRepo.save(perfil);
    console.log(`✅ Perfil inserido`);
  }

  const empresaRepo = dataSource.getRepository(EmpresaTypeormEntity);
  const estagiarioRepo = dataSource.getRepository(EstagiarioTypeormEntity);
  const estagioRepo = dataSource.getRepository(EstagioTypeormEntity);

  // Criar Empresa
  const empresaId = crypto.randomUUID();
  const empresa = empresaRepo.create({
    id: empresaId,
    razaoSocial: "Empresa Parceira de Tecnologia LTDA",
    nomeFantasia: "TechPartner",
    cnpj: "12345678000199",
    telefone: "11999999999",
    email: "contato@techpartner.com",
    endereco: endereco,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  });
  await empresaRepo.save(empresa);
  console.log(`✅ Empresa inserida (ID: ${empresaId})`);

  // Criar Estagiário
  const estagiarioId = crypto.randomUUID();
  const estagiario = estagiarioRepo.create({
    id: estagiarioId,
    perfil: perfil,
    curso: curso,
    periodo: "Noturno",
    telefone: "11988888888",
    emailInstitucional: "aluno.estagio@ladesa.com.br",
    dataNascimento: "2000-05-15",
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  });
  await estagiarioRepo.save(estagiario);
  console.log(`✅ Estagiário inserido (ID: ${estagiarioId})`);

  // Criar Estágio
  const estagioId = crypto.randomUUID();
  const estagio = estagioRepo.create({
    id: estagioId,
    campus: campus,
    empresa: empresa,
    estagiario: estagiario,
    cargaHoraria: 30, // 30h semanais
    dataInicio: "2024-01-01",
    dataFim: "2024-12-31",
    status: EstagioStatus.EM_ANDAMENTO,
    nomeSupervisor: "João Silva",
    emailSupervisor: "joao.silva@techpartner.com",
    telefoneSupervisor: "11977777777",
    aditivo: false,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  });
  await estagioRepo.save(estagio);
  console.log(`✅ Estágio inserido (ID: ${estagioId})`);

  await dataSource.destroy();
  console.log("Seeds da feature Estágio concluídos com sucesso!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
