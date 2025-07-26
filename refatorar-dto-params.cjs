#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Alvo: arquivos .ts
const diretorio = process.argv[2] || ".";

function substituirParamsPorParameters(content) {
  return content.replace(/\bdto\.params\.(\w+)\b/g, "dto.parameters.path.$1");
}

function percorrerDiretorio(diretorio) {
  fs.readdirSync(diretorio).forEach((arquivo) => {
    const caminhoAbsoluto = path.join(diretorio, arquivo);
    const stats = fs.statSync(caminhoAbsoluto);

    if (stats.isDirectory()) {
      percorrerDiretorio(caminhoAbsoluto); // recursivo
    } else if (stats.isFile() && arquivo.endsWith(".ts")) {
      const conteudo = fs.readFileSync(caminhoAbsoluto, "utf8");

      if (conteudo.includes("dto.params.")) {
        const novoConteudo = substituirParamsPorParameters(conteudo);
        fs.writeFileSync(caminhoAbsoluto, novoConteudo, "utf8");
        console.log("✏️  Atualizado:", caminhoAbsoluto);
      }
    }
  });
}

// Executar
percorrerDiretorio(diretorio);
