# Segurança

**TLDR**: encontrou uma vulnerabilidade? Não abra issue pública, mande e-mail pra `ladesa.sisgea@gmail.com`. Confirmação em até 48 horas, triagem em até 5 dias úteis. O projeto ainda não tem versão 1.0, só `main` recebe correção de segurança.

| Termo | Vá pra |
|---|---|
| Como reportar, o que incluir | [Reportando uma vulnerabilidade](#reportando-uma-vulnerabilidade) |
| O que acontece depois do reporte | [Processo de tratamento](#processo-de-tratamento) |
| O que está e não está coberto | [Escopo](#escopo) |

## Versões suportadas

Sem versão 1.0 estável ainda, o versionamento segue modelo evolutivo. Só a última versão publicada, ou o branch `main`, recebe correção de segurança, versão `0.x` antiga ou descontinuada não recebe. Sem garantia de retrocompatibilidade durante o ciclo `0.x`. Depois do lançamento da 1.0, esta política será revisada pra definir suporte formal por faixa de versão (`1.x`, `2.x`).

## Reportando uma vulnerabilidade

Encontrou uma vulnerabilidade de segurança? Não abra uma issue pública. Envie um e-mail pra `ladesa.sisgea@gmail.com`, de forma privada.

Inclua sempre que possível: descrição clara da vulnerabilidade, impacto esperado (escalonamento de privilégio, vazamento de dado, negação de serviço, bypass de autenticação), passo detalhado de reprodução, ambiente afetado (versão, configuração, endpoint, sistema operacional), evidência técnica (log, payload, requisição, print, PoC), mitigação sugerida se houver. Reporte incompleto aumenta o tempo de resposta.

## Processo de tratamento

1. **Confirmação de recebimento**, até 48 horas.
2. **Avaliação inicial**, até 5 dias úteis, cobrindo validade, impacto potencial, superfície de ataque e reprodutibilidade.
3. **Classificação de severidade**: `Critical` (execução remota de código, acesso não autorizado a dado sensível, comprometimento sistêmico), `High` (impacto significativo em segurança ou disponibilidade), `Medium` (impacto moderado ou exploração dependente de condição específica), `Low` (impacto limitado).
4. **Correção e mitigação**, prazo conforme severidade e complexidade técnica, via patch direto, mitigação temporária, atualização de dependência, ou hardening de configuração.

O projeto adota **divulgação responsável**: vulnerabilidade é tratada de forma confidencial, detalhe técnico não é divulgado antes de existir correção, e quem reporta não deve divulgar publicamente antes da resolução. Depois da correção, a vulnerabilidade pode ser registrada em changelog, release notes ou advisory de segurança.

## Escopo

Cobre código-fonte da aplicação, API e endpoint expostos, autenticação e autorização, armazenamento e processamento de dado, infraestrutura diretamente mantida pelo projeto, integração interna.

**Fora de escopo**: problema em dependência de terceiro fora do controle do projeto, ambiente modificado por usuário, configuração incorreta de implantação, teste de carga ou stress não autorizado, engenharia social, vulnerabilidade que depende exclusivamente de acesso administrativo já legítimo.

## Boas práticas adotadas

Validação e sanitização de entrada, autenticação e controle de acesso, HTTPS/TLS, gerenciamento seguro de segredo, atualização periódica de dependência, log e auditoria, revisão de código, monitoramento de vulnerabilidade conhecida. Essas práticas evoluem conforme a maturidade do projeto, esta página é revisada periodicamente pra continuar alinhada com a prática atual.
