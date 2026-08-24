# Gates de qualidade

Sete ferramentas rodam a cada push e pull request, no workflow `quality.yml`. O conjunto e o formato vêm do que já roda no `portfolio` e no `bondspot/server`, adaptados aqui.

Nenhuma delas roda no host. Tudo acontece dentro de uma imagem única, construída a partir de `Containerfile`, com toda ferramenta fixada por versão e as duas baixadas por `curl` verificadas por `sha256sum`. O `run.sh` nomeia a imagem pelo hash do próprio `Containerfile`, então mudar a receita invalida o cache sozinho, sem ninguém precisar lembrar de reconstruir.

```bash
bash tools/quality/run.sh gitleaks detect --source . --no-git --redact
```

## O passo que não pode falhar

Antes de qualquer gate, o workflow roda um passo **bloqueante** que chama `--version` nas sete ferramentas. Ele existe porque `continue-on-error: true` não distingue "achou zero problema" de "nunca executou": os dois aparecem como verde para quem olha o resumo do job.

Essa lição não é teórica. No `Ladesa/infrastructure`, dez checks ficaram meses "passando" sem nunca terem rodado, porque o bootstrap da ferramenta falhava e o afrouxamento escondia. Aqui, se uma ferramenta parar de executar, esse passo falha sozinho, separado do resultado do lint.

## Estado inicial, medido em 2026-08-22

Todos os gates nascem com `continue-on-error: true`, por decisão explícita: o objetivo desta primeira leva é conhecer o baseline, não travar quem está trabalhando. Cada um vira bloqueante depois que o achado dele for revisado e zerado.

| Gate | O que procura | Baseline |
|---|---|---|
| `gitleaks` | segredo versionado | **7 ocorrências**, três com aspecto de credencial real |
| `osv-scanner` | dependência com vulnerabilidade conhecida | a medir |
| `trivy` | configuração insegura em Dockerfile e manifesto | 1 HIGH, falta `--no-install-recommends` num Containerfile |
| `semgrep` | padrão inseguro no código | a medir |
| `lizard` | complexidade ciclomática e tamanho de função | limpo, depois de excluir `*.spec.ts` |
| `jscpd` | código duplicado | 231 clones |
| `ast-grep` | comentário em YAML | limpo |

O achado do `gitleaks` está registrado no repositório privado `infrastructure-vault`, não aqui, porque detalhar credencial exposta num repositório público seria repetir o próprio problema. Quem for tratar precisa olhar lá.

O `gitleaks` é o primeiro candidato a virar bloqueante, assim que os sete forem tratados. Segredo versionado não é dívida de estilo, é exposição.

## Por que o `lizard` ignora `*.spec.ts`

Os únicos avisos que ele produziu foram sobre o tamanho de blocos `describe` em arquivo de teste, que é característica natural de suíte, não complexidade real. Manter o aviso ali só ensinaria a ignorar a ferramenta.

## Registro de afrouxamento

Todo `continue-on-error` desta lista é afrouxamento deliberado e temporário, e segue a mesma regra do `Ladesa/infrastructure`: entra em pendência junto com a justificativa, no mesmo commit que o introduz, e a revisão de rotina relê a lista para achar o que já deveria ter voltado a ser bloqueante.
