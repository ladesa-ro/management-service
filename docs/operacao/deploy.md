# Deploy em desenvolvimento

**TLDR**: não existe comando de deploy pra rodar. Edite o `values-development.yaml` do componente em `gitops/apps/`, ou o `Application` em `gitops/envs/development/applications/`, abra um Pull Request, e o Argo CD aplica sozinho assim que o PR é mergeado em `main`. Contexto completo em [CI/CD e deploy](../arquitetura/ci-cd-e-deploy.md#deploy-via-gitops).

1. Edite o arquivo certo:
   - Mudou réplica, recurso (CPU/memória), variável de ambiente, ou domínio do `Ingress`? Edite `gitops/apps/api/values-development.yaml` (ou `gitops/apps/waha/values-development.yaml` pro WAHA).
   - Mudou a versão do chart `stakater/application`, ou o release name? Edite `gitops/apps/<componente>/Chart.yaml`.
   - Mudou o namespace de destino, ou a política de sync do Argo CD? Edite `gitops/envs/development/applications/<componente>.yaml`.
2. Abra um Pull Request normal, seguindo [Contribuindo](contribuindo.md).
3. Depois do merge em `main`, o Argo CD detecta a mudança e aplica sozinho (`automated: { prune: true, selfHeal: true }`), sem precisar rodar comando nenhum manualmente.

Pra acompanhar o resultado, seria preciso acesso ao Argo CD do cluster (fora do escopo deste repositório, ver [infrastructure](https://github.com/ladesa-ro/infrastructure)).

O build e push da imagem continuam automáticos a cada push em `main` que toque `src/`, ver [CI/CD e deploy](../arquitetura/ci-cd-e-deploy.md#pipeline-de-cicd), mas isso é independente do deploy: trocar a imagem publicada não aplica nada no cluster sozinho, quem aplica é sempre o Argo CD reconciliando `gitops/`.
