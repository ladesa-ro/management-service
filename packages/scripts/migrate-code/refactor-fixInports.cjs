const { Project, SyntaxKind } = require("ts-morph");
const path = require("path");

const project = new Project({
  tsConfigFilePath: path.resolve("tsconfig.json"),
});

// Defina o padrão de arquivos que você quer alterar no final da linha
const files = project.addSourceFilesAtPaths("packages/service/lib/application/resources/**/*.controller.ts");

for (const sourceFile of files) {
  const importDecls = sourceFile.getImportDeclarations();

  // 1. Adiciona o import do HttpOperationInput, se não existir
  const httpOpImport = importDecls.find((decl) =>
    decl.getModuleSpecifierValue() === "@/application/standards-new/HttpOperation"
  );

  if (!httpOpImport) {
    sourceFile.addImportDeclaration({
      namedImports: ["HttpOperationInput"],
      moduleSpecifier: "@/application/standards-new/HttpOperation",
    });
  } else {
    const alreadyImported = httpOpImport.getNamedImports().some(ni => ni.getName() === "HttpOperationInput");
    if (!alreadyImported) {
      httpOpImport.addNamedImport("HttpOperationInput");
    }
  }

  // 2. Adiciona o import do IApiDoc, se não existir
  const apiDocImport = importDecls.find((decl) =>
    decl.getModuleSpecifierValue() === "@/application/standards-new/openapi"
  );

  if (!apiDocImport) {
    sourceFile.addImportDeclaration({
      namedImports: ["IApiDoc"],
      moduleSpecifier: "@/application/standards-new/openapi",
    });
  } else {
    const alreadyImported = apiDocImport.getNamedImports().some(ni => ni.getName() === "IApiDoc");
    if (!alreadyImported) {
      apiDocImport.addNamedImport("IApiDoc");
    }
  }

  // 3. Remove "CombinedInput" de qualquer import
  for (const decl of importDecls) {
    const named = decl.getNamedImports();
    for (const namedImport of named) {
      if (namedImport.getName() === "CombinedInput") {
        // Remove o import todo se for só CombinedInput
        if (named.length === 1) {
          decl.remove();
        } else {
          namedImport.remove();
        }
        break;
      }
    }
  }

  // 4. Salvar as modificações
  if (!sourceFile.isSaved()) {
    sourceFile.saveSync();
    console.log("✅ Atualizado:", sourceFile.getFilePath());
  }
}
