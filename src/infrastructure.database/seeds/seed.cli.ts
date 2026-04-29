#!/usr/bin/env node

/**
 * Script para executar o seed de dados fictícios
 *
 * Uso:
 *   bun run seed
 *
 * Este script irá popular o banco de dados com dados fictícios baseados nas entities do projeto.
 */

import { createDataSource } from "@/infrastructure.database/data-sources/create-data-source";
import { runSeed } from "@/infrastructure.database/seeds/run-seed";

async function main(): Promise<void> {
  console.log("🌱 Inicializando seed de dados...\n");

  let dataSource;

  try {
    // Criar e inicializar DataSource
    dataSource = createDataSource();
    await dataSource.initialize();
    console.log("✅ Conexão com banco de dados estabelecida\n");

    // Executar seed
    await runSeed(dataSource);
  } catch (error) {
    console.error("❌ Erro fatal:", error);
    process.exit(1);
  } finally {
    if (dataSource?.isInitialized) {
      await dataSource.destroy();
      console.log("\n🔌 Conexão com banco de dados fechada");
    }
  }
}

main().catch((error) => {
  console.error("❌ Erro não tratado:", error);
  process.exit(1);
});
