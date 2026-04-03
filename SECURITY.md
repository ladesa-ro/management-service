# Security Policy

## Supported Versions

Este projeto ainda não possui uma versão **1.0** estável. O versionamento segue um modelo evolutivo, e apenas a versão mais recente em desenvolvimento ativo recebe atualizações de segurança.

| Version                 | Supported |
| ----------------------- | --------- |
| `main` / latest release | ✅         |
| versões `0.x` antigas   | ❌         |
| versões descontinuadas  | ❌         |

### Política de suporte

* Apenas a **última versão publicada** ou o branch principal (`main`) recebe correções de segurança.
* Versões anteriores podem não receber correções, mesmo que contenham vulnerabilidades conhecidas.
* Durante o ciclo `0.x`, não há garantia de retrocompatibilidade.
* Após o lançamento da versão **1.0**, esta política será revisada para definir suporte formal por faixa de versões (por exemplo: `1.x`, `2.x`).

---

## Reporting a Vulnerability

Se você identificar uma vulnerabilidade de segurança, **não abra uma issue pública**.

Em vez disso, reporte de forma privada utilizando o canal oficial abaixo.

### Canal de reporte

Envie um e-mail para:

```
ladesa.sisgea@gmail.com
```

---

## Informações necessárias no reporte

Para acelerar a análise e correção, inclua sempre que possível:

* descrição clara da vulnerabilidade
* impacto esperado (ex: escalonamento de privilégio, vazamento de dados, negação de serviço, bypass de autenticação, etc.)
* passos detalhados para reprodução
* ambiente afetado (versão, configuração, endpoint, sistema operacional, etc.)
* evidências técnicas (logs, payloads, requisições, prints, PoC)
* mitigação sugerida (se aplicável)

Relatórios incompletos podem aumentar o tempo de resposta.

---

## Processo de tratamento

Após o recebimento do reporte, o fluxo padrão segue as etapas abaixo.

### 1. Confirmação de recebimento

Prazo estimado:

* até **48 horas**

### 2. Avaliação inicial (triagem)

Prazo estimado:

* até **5 dias úteis**

Nesta etapa serão avaliados:

* validade da vulnerabilidade
* impacto potencial
* superfície de ataque
* reprodutibilidade

### 3. Classificação de severidade

A vulnerabilidade será classificada conforme critérios técnicos de risco:

* **Critical** — execução remota de código, acesso não autorizado a dados sensíveis, comprometimento sistêmico
* **High** — impacto significativo em segurança ou disponibilidade
* **Medium** — impacto moderado ou exploração dependente de condições específicas
* **Low** — impacto limitado ou baixo risco operacional

### 4. Correção e mitigação

O tempo de correção depende da severidade e da complexidade técnica da vulnerabilidade.

Sempre que possível, serão aplicadas:

* correção direta (patch)
* mitigação temporária
* atualização de dependências
* hardening de configuração

---

## Divulgação responsável (Responsible Disclosure)

Este projeto adota o modelo de **divulgação responsável**.

Isso significa que:

* vulnerabilidades serão tratadas de forma confidencial
* detalhes técnicos não serão divulgados antes da existência de uma correção
* pesquisadores de segurança não devem divulgar publicamente a vulnerabilidade antes da resolução

Após a correção, a vulnerabilidade poderá ser registrada em:

* changelog
* release notes
* advisory de segurança

---

## Escopo da política

Esta política cobre os seguintes componentes do projeto:

* código-fonte da aplicação
* APIs e endpoints expostos
* autenticação e autorização
* armazenamento e processamento de dados
* infraestrutura diretamente mantida pelo projeto
* integrações internas

---

## Fora de escopo

Os seguintes itens não são considerados vulnerabilidades de segurança dentro desta política:

* problemas em dependências de terceiros fora do controle do projeto
* ambientes modificados por usuários
* configurações incorretas de implantação
* testes de carga ou stress não autorizados
* ataques de engenharia social
* vulnerabilidades que dependem exclusivamente de acesso administrativo legítimo

---

## Boas práticas de segurança adotadas

O projeto busca seguir práticas modernas de segurança de software, incluindo quando aplicável:

* validação e sanitização de entrada
* autenticação e controle de acesso
* uso de HTTPS/TLS
* gerenciamento seguro de segredos
* atualização periódica de dependências
* logging e auditoria
* revisão de código
* monitoramento de vulnerabilidades conhecidas

Essas práticas podem evoluir conforme a maturidade do projeto.

---

## Atualizações desta política

Esta política pode ser atualizada a qualquer momento para refletir mudanças operacionais, técnicas ou regulatórias.

Recomenda-se revisar periodicamente este documento para garantir alinhamento com as práticas atuais de segurança do projeto.
