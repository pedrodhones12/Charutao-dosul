# Modelo inicial do banco de dados

Banco recomendado: PostgreSQL. Este arquivo é uma especificação; ainda é necessário criar e testar migrações.

## Tabelas principais
- `users`: UUID, nome, e-mail único, hash de senha ou referência de identidade, estado, MFA e timestamps.
- `roles`, `permissions`, `user_roles`, `role_permissions`: papéis e permissões.
- `authors`: usuário opcional, nome público, slug, biografia, retrato e especialidades.
- `articles`: título, subtítulo, resumo, slug único, corpo, estado, categoria, autor, idioma, localização, destaque, publicação, atualização e SEO.
- `categories`: nome, slug, descrição e categoria-pai opcional.
- `tags`, `article_tags`: etiquetas e relação muitos-para-muitos.
- `article_revisions`: versão, conteúdo, editor, motivo e data.
- `media`: arquivo, MIME, tamanho, dimensões, texto alternativo, legenda, crédito, direitos e uploader.
- `article_media`: relação de artigos e mídias, função e ordenação.
- `article_sources`: artigo, fonte, URL, tipo e data de consulta.
- `editorial_reviews`: artigo, revisor, decisão, comentário e data.
- `audit_logs`: ator, ação, entidade, data e metadados mínimos; nunca armazenar tokens ou senhas.
- `article_locations`: país, região, município e coordenadas opcionais.
- `pages`, `newsletter_subscriptions`, `contact_submissions`, `correction_requests`, `redirects`, `scheduled_jobs`.
- Opcional: `events` e `advertising_campaigns`, conforme o escopo comercial.

## Relações
```text
users 1—N article_revisions
users N—N roles N—N permissions
authors 1—N articles
categories 1—N articles
articles N—N tags
articles 1—N article_revisions
articles N—N media
articles 1—N article_sources
articles 1—N editorial_reviews
```

## Integridade e publicação
Usar UUID, chaves estrangeiras, restrições, índices por estado/data/categoria/autor e slugs únicos. Só exibir artigos publicados cuja data já chegou. Cada alteração relevante cria revisão e log. Preferir arquivamento a exclusão destrutiva. Definir retenção de dados conforme LGPD. O servidor deve validar transições de estado e permissões. Agendamentos precisam de fuso horário definido e execução idempotente.