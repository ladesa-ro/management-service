# proto

Fonte da verdade do contrato `timetable-generator-v1`, usada pelos dois lados da geração de horário: o worker em TypeScript e o console em C#. Substitui o pacote `Ladesa.Messages.TimetableGenerator.V1`, que vinha de um repositório à parte hoje arquivado e por isso não pode mais ser republicado.

`.commands/generate` builda um container com `protoc` e `ts-proto` fixados por versão e gera dois alvos a partir do mesmo `.proto`, sem instalar nada no host: TypeScript em `generated/`, consumido pelo worker, e C# em `generated-csharp/`, compilado pelo projeto `core/messages`.

Os arquivos dentro de `generated/` e `generated-csharp/` têm o cabeçalho de "não editar" que o `protoc`/`ts-proto` já colocam. Isso não segue a convenção de zero comentário do resto do projeto de propósito, é saída de ferramenta, não código escrito à mão.

## O fio é JSON, não binário

O contrato define os tipos, mas a serialização entre worker e console é o **JSON canônico do protobuf**, não o formato binário. `JsonFormatter`/`JsonParser` do `Google.Protobuf` e o `toJSON`/`fromJSON` que o `ts-proto` gera implementam esse mapeamento, que é parte da especificação e não uma convenção local.

A escolha é deliberada. Os dois lados saem do mesmo commit e sobem juntos, então a compatibilidade por número de campo, que é o argumento mais forte do binário, não compra nada aqui. Uma execução por geração faz o custo de serialização virar ruído perto de um solve que leva dezenas de segundos. Em troca, o payload continua legível: uma requisição que falhou pode ser salva em arquivo, inspecionada, editada e reexecutada à mão. E o stdout do console é compartilhado com qualquer biblioteca que resolva escrever ali, o que corromperia um payload binário de forma opaca.

Trocar para binário depois, se o console virar artefato distribuído à parte ou o payload crescer o bastante para aparecer no perfil, é trocar duas chamadas. O contrato não muda.

## `enabled_constraints` é invólucro, e não `repeated` direto

`GenerateRequest.enabled_constraints` é `optional ConstraintKindList`, uma mensagem que carrega a lista, em vez de um `repeated ConstraintKind` no próprio `GenerateRequest`.

O motivo é semântico e vale registrar porque a forma ingênua parece mais simples e está errada. O domínio trata `null` e lista vazia como coisas opostas: em `Generator.cs`, `request.EnabledConstraints ?? AllConstraintKinds` significa que **não informar liga todas as restrições**, enquanto informar uma lista vazia desliga todas e produz uma grade que viola tudo. Proto3 não distingue campo `repeated` ausente de campo `repeated` vazio, os dois desserializam para lista vazia. Só campo de mensagem tem presença. O invólucro existe exatamente para preservar essa diferença.

## Divergência que motivou completar o contrato

O `.proto` foi escrito a partir do contrato de mensagens antigo e ficou para trás do domínio. Até 2026-08-22 o `GenerateRequest` declarava sete campos enquanto o domínio tinha treze: faltavam os cinco boosts que alimentam a função objetivo do solver e o `enabled_constraints`. Adotar o contrato naquele estado faria tudo isso chegar zerado ao solver, sem erro de compilação e sem aviso, degradando a geração de forma silenciosa. Os seis campos foram acrescentados nas posições 8 a 13.
