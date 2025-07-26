// refatorar-controllers.cjs
// Script JS para refatorar controllers NestJS usando ts-morph sem precisar de tsconfig
// Instalação: npm install ts-morph
// Uso: node refatorar-controllers.cjs

const { Project, SyntaxKind } = require('ts-morph');
const path = require('path');

// Inicializa projeto sem tsconfig
const project = new Project();

// Refatora todos os controllers no diretório packages/service/lib/application/resources

//project.addSourceFilesAtPaths('packages/service/lib/application/resources/**/*.controller.ts'); //altera os controllers

project.addSourceFilesAtPaths("packages/service/lib/application/resources/**/*.resolver.ts"); //altera os resolvers


project.getSourceFiles().forEach(sourceFile => {
  let mudou = false;

  // Remove @Operation
  sourceFile.getDescendantsOfKind(SyntaxKind.Decorator)
    .filter(d => d.getName() === 'Operation')
    .forEach(d => { d.remove(); mudou = true; });

  // Remove Param("id", ...)
  sourceFile.getDescendantsOfKind(SyntaxKind.Parameter)
    .filter(p => p.getDecorators().some(d => d.getName() === 'Param' && d.getText().includes('"id"')))
    .forEach(p => { p.remove(); mudou = true; });

  // Processa métodos async
  sourceFile.getClasses().forEach(cls => {
    cls.getMethods().forEach(method => {
      if (!method.isAsync()) return;
      const fn = method.getName();
      const Op = fn.charAt(0).toUpperCase() + fn.slice(1);

      // Substitui CombinedInput
      method.getParameters().forEach(param => {
        if (param.getDecorators().some(d => d.getName() === 'CombinedInput')) {
          param.getDecorators()
            .filter(d => d.getName() === 'CombinedInput')
            .forEach(d => d.remove());
          param.rename('dto');
          param.setType(`IApiDoc.operations["${Op}"]`);
          param.addDecorator({ name: 'HttpOperationInput', arguments: [`"${Op}"`] });
          mudou = true;
        }
      });

      // Ajusta corpo
      const body = method.getBodyText() || '';
      const novo = body
        .replace(/combinedInput\.params\.id/g, 'dto.parameters.path.id')
        .replace(/\bcombinedInput\b/g, 'dto')
        .replace(/id\s*:\s*id/g, 'id: dto.parameters.path.id');
      if (novo !== body) {
        method.setBodyText(novo);
        mudou = true;
      }
    });
  });

  if (mudou) sourceFile.saveSync();
});

console.log('✅ Refatoração concluída!');
