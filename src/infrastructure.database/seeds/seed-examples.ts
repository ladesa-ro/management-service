/**
 * EXEMPLO DE USO: Acessando dados do seed
 *
 * Este arquivo demonstra como usar os dados do seed em testes ou outros contextos.
 */

import {
  cidades,
  enderecos,
  campus,
  usuarios,
  estagiarios,
  estagios,
  empresas,
  disciplinas,
} from "./seed-data";

/**
 * Exemplo 1: Acessar dados de uma cidade específica
 */
export function exemploAcessarCidade(): void {
  const jpCity = cidades.find((c) => c.nome === "Ji-Paraná");
  console.log("Cidade encontrada:", jpCity?.nome, jpCity?.estado);
}

/**
 * Exemplo 2: Acessar todos os endereços de um campus
 */
export function exemploAcessarEnderecoCampus(): void {
  const campusJP = campus.find((c) => c.nomeFantasia.includes("Ji-Paraná"));
  if (campusJP) {
    const enderecoCampus = enderecos.find((e) => e.id === campusJP.idEnderecoFk);
    console.log("Campus:", campusJP.nomeFantasia);
    console.log("Endereço:", enderecoCampus?.logradouro, enderecoCampus?.bairro);
  }
}

/**
 * Exemplo 3: Encontrar todos os usuários com role de professor
 */
export function exemploAcessarUsuarios(): void {
  const usuarios_seeds = usuarios.slice(0, 5);
  console.log("Primeiros usuários:", usuarios_seeds.map((u) => u.nome));
}

/**
 * Exemplo 4: Encontrar estagiários de um curso específico
 */
export function exemploAcessarEstagiarios(): void {
  console.log(`Total de estagiários no seed: ${estagiarios.length}`);
  estagiarios.forEach((e) => {
    console.log(`- Estagiário: ${e.emailInstitucional}`);
  });
}

/**
 * Exemplo 5: Listar todas as empresas
 */
export function exemploListarEmpresas(): void {
  console.log("Empresas cadastradas:");
  empresas.forEach((e) => {
    console.log(`- ${e.nomeFantasia} (CNPJ: ${e.cnpj})`);
  });
}

/**
 * Exemplo 6: Consultar estágios por status
 */
export function exemploEstagiosPorStatus(): void {
  const estagiosAtivos = estagios.filter((e) => e.status === "EM_FASE_INICIAL");
  console.log(`Estágios em fase inicial: ${estagiosAtivos.length}`);
}

/**
 * Exemplo 7: Acessar disciplinas e sua carga horária
 */
export function exemploDisciplinas(): void {
  const totalCargaHoraria = disciplinas.reduce((total, d) => total + d.cargaHoraria, 0);
  console.log("Total de horas de disciplinas:", totalCargaHoraria);
  console.log("Disciplinas:");
  disciplinas.forEach((d) => {
    console.log(`- ${d.nome} (${d.cargaHoraria}h)`);
  });
}

// Executar exemplos
if (import.meta.main) {
  console.log("=== EXEMPLOS DE USO DO SEED ===\n");

  console.log("1. Acessar Cidade:");
  exemploAcessarCidade();

  console.log("\n2. Acessar Endereço Campus:");
  exemploAcessarEnderecoCampus();

  console.log("\n3. Acessar Usuários:");
  exemploAcessarUsuarios();

  console.log("\n4. Acessar Estagiários:");
  exemploAcessarEstagiarios();

  console.log("\n5. Listar Empresas:");
  exemploListarEmpresas();

  console.log("\n6. Estágios por Status:");
  exemploEstagiosPorStatus();

  console.log("\n7. Disciplinas:");
  exemploDisciplinas();
}
