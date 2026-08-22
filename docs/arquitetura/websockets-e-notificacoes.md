# WebSockets e notificações

**TLDR**: comunicação bidirecional em tempo real via Socket.IO, com adapter Redis pra escalar horizontalmente entre múltiplos nós. Uso atual restrito ao módulo de Estágios.

O sistema usa **WebSockets**, via [Socket.IO](https://socket.io/), pra comunicação bidirecional em tempo real, o que viabiliza notificação instantânea pro usuário final sem esse precisar recarregar a página ou fazer polling.

A arquitetura WebSocket suporta escala horizontal através do adapter oficial **RedisAdapter** (`@socket.io/redis-adapter` e `ioredis`), permitindo que mensagens de pub/sub trafeguem pelo Redis pra sincronizar todos os nós rodando o `management-service` ao mesmo tempo.

Uso atual: notificação em tempo real do módulo de Estágios, cobrindo alerta preventivo de prazo, encerramento, criação, importação CSV assíncrona e status de visita.

Este documento não cobre em detalhe os tipos de notificação, os canais (rooms) e o formato dos pacotes trocados com o cliente, o `README.md` anterior a esta migração linkava um arquivo dedicado (`.claude/docs/notificacoes-websocket.md`) que nunca chegou a ser criado, ver [Pendências](../operacao/pendencias.md).
