#!/bin/bash

# ============================================
# SEED DE DADOS FICTÍCIOS - INSTRUÇÕES
# ============================================
#
# Este arquivo contém instruções em texto para
# facilitar a compreensão do que foi criado
#
# ============================================

cat << 'EOF'

╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║        ✅ SEED DE DADOS FICTÍCIOS CRIADO COM SUCESSO!                    ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

📁 LOCALIZAÇÃO DOS ARQUIVOS:
   src/infrastructure.database/seeds/

📋 ARQUIVOS CRIADOS:
   ✓ seed-data.ts         → Dados fictícios (92 registros)
   ✓ run-seed.ts          → Função de inserção
   ✓ seed.cli.ts          → Script CLI executável
   ✓ seed-examples.ts     → Exemplos de uso
   ✓ index.ts             → Exportações centralizadas
   ✓ README.md            → Documentação completa
   ✓ QUICKSTART.md        → Guia rápido
   ✓ SUMMARY.md           → Este documento

═══════════════════════════════════════════════════════════════════════════

🚀 COMO EXECUTAR O SEED:

   Opção 1: Dentro do container (RECOMENDADO)
   $ just exec bun run seed

   Opção 2: Diretamente com bun
   $ bun run seed

   Opção 3: Manualmente (se necessário)
   $ cd src
   $ bun run tsx infrastructure.database/seeds/seed.cli.ts

═══════════════════════════════════════════════════════════════════════════

📊 DADOS QUE SERÃO INSERIDOS:

   ┌─────────────────────────────────────────┐
   │ ENTIDADE              │ QUANTIDADE       │
   ├──────────────────────┼──────────────────┤
   │ Cidades              │ 4                │
   │ Endereços            │ 4                │
   │ Campus               │ 3                │
   │ Modalidades          │ 4                │
   │ Níveis de Formação   │ 3                │
   │ Ofertas de Formação  │ 5                │
   │ Cursos               │ 5                │
   │ Turmas               │ 5                │
   │ Cargos               │ 5                │
   │ Usuários             │ 12               │
   │ Perfis (Vínculos)    │ 7                │
   │ Estagiários          │ 5                │
   │ Empresas             │ 5                │
   │ Estágios             │ 5                │
   │ Disciplinas          │ 7                │
   │ Responsáveis Empresa │ 5                │
   ├──────────────────────┼──────────────────┤
   │ TOTAL                │ 92 REGISTROS     │
   └──────────────────────┴──────────────────┘

═══════════════════════════════════════════════════════════════════════════

💡 EXEMPLOS DE USO EM CÓDIGO:

   1. Importar dados em um arquivo:
   ──────────────────────────────────
   import { usuarios, empresas } from "@/infrastructure.database/seeds";

   console.log(usuarios[0].nome);        // "Jefferson Antônio dos Santos"
   console.log(empresas.length);         // 5

   2. Usar em um teste:
   ─────────────────────
   import { estagios } from "@/infrastructure.database/seeds";

   describe("Estagio Service", () => {
     it("deve processar estagio", () => {
       const estagio = estagios[0];
       expect(estagio.status).toBe("EM_FASE_INICIAL");
     });
   });

   3. Buscar dados específicos:
   ────────────────────────────
   import { usuarios, campus } from "@/infrastructure.database/seeds";

   const professores = usuarios.filter(u => u.email?.includes("ifro.edu.br"));
   const campusJP = campus.find(c => c.apelido === "ifro-jp");

═══════════════════════════════════════════════════════════════════════════

⚙️  SCRIPT ADICIONADO AO PACKAGE.JSON:

   "seed": "tsx src/infrastructure.database/seeds/seed.cli.ts"

   Usar: bun run seed

═══════════════════════════════════════════════════════════════════════════

📚 DOCUMENTAÇÃO:

   Rápido:    src/infrastructure.database/seeds/QUICKSTART.md
   Completo:  src/infrastructure.database/seeds/README.md
   Exemplos:  src/infrastructure.database/seeds/seed-examples.ts

═══════════════════════════════════════════════════════════════════════════

⚠️  PONTOS IMPORTANTES:

   ✋ Este seed é APENAS para DESENVOLVIMENTO
   ✋ Cada execução ADICIONA novos registros (não faz update)
   ✋ Para limpar dados: just exec bun run db:reset
   ✋ Dados baseados em CSV real (Estagiarios.csv)

═══════════════════════════════════════════════════════════════════════════

✅ VERIFICAR SE O SEED FUNCIONOU:

   Dentro do container:
   $ just exec bun run typeorm query "SELECT COUNT(*) FROM usuario"
   $ just exec bun run typeorm query "SELECT COUNT(*) FROM estagio"

   Ou com psql:
   $ just exec psql -U manager_user -d management_service_db \\
     -c "SELECT COUNT(*) FROM usuario;"

═══════════════════════════════════════════════════════════════════════════

📝 PRÓXIMOS PASSOS:

   1. ✓ Execute: just exec bun run seed
   2. ✓ Verifique os dados: just exec bun run typeorm query ...
   3. ✓ Explore seed-examples.ts para mais uso
   4. ✓ Customize dados em seed-data.ts se necessário
   5. ✓ Use em seus testes e desenvolvimento

═══════════════════════════════════════════════════════════════════════════

🎯 CHECKLIST FINAL:

   □ Arquivos criados em src/infrastructure.database/seeds/
   □ Script "seed" adicionado em package.json
   □ Documentação completa disponível
   □ Exemplos de uso fornecidos
   □ Pronto para executar: just exec bun run seed

═══════════════════════════════════════════════════════════════════════════

❓ DÚVIDAS?

   1. Leia: README.md (documentação completa)
   2. Veja: seed-examples.ts (exemplos práticos)
   3. Procure: Troubleshooting em README.md
   4. Consulte: QUICKSTART.md (guia rápido)

═══════════════════════════════════════════════════════════════════════════

✨ Tudo pronto! Execute: just exec bun run seed

╚════════════════════════════════════════════════════════════════════════════╝

EOF
