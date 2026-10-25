# Arquitetura e mapa editorial

## Estado do projeto
A versão atual é um protótipo estático. Para produção, separar site público, CMS privado, API, banco e armazenamento de mídia.

```text
Leitor → CDN/HTTPS → Site público → API/camada de domínio → PostgreSQL
                                  ↘ mídia/CDN, SEO e métricas
Redação → CMS autenticado → revisão/aprovação → publicação/agendamento
```

## Stack proposta
- Frontend: Next.js, React e TypeScript.
- API: rotas de servidor ou serviço dedicado, com validação no servidor.
- Banco: PostgreSQL, Prisma ORM e migrações versionadas.
- Autenticação: sessões seguras e MFA para contas privilegiadas.
- Mídia: armazenamento compatível com S3, CDN, imagens responsivas e metadados de crédito.
- Operação: GitHub, CI, testes, logs, alertas, backups e ambientes separados.

## Mapa público
Home, últimas notícias, Brasil, Mundo (América Latina, América do Norte, Europa, África, Ásia, Oriente Médio e Oceania), Bahia, Sul da Bahia, política, economia, meio ambiente, cultura, literatura, educação, tecnologia, ciência, entrevistas, reportagens especiais, investigações, opinião, colunistas, multimídia, busca, arquivo, autores, sobre, expediente, contato, política editorial, privacidade e correções.

## URLs sugeridas
`/`, `/ultimas-noticias/`, `/brasil/`, `/mundo/`, `/bahia/`, `/sul-da-bahia/`, `/cultura/literatura/`, `/tecnologia/`, `/ciencia/`, `/noticias/titulo-da-reportagem/`, `/autores/nome-do-autor/`, `/especiais/nome-do-projeto/`, `/busca?q=termo`.

## Telas
1. Home: manchete principal, destaques, últimas, editorias, especiais, opinião e newsletter.
2. Editoria: introdução, destaques, listagem paginada e filtros.
3. Matéria: título, linha fina, autor, datas, imagem/legenda/crédito, corpo, fontes, relacionadas e correções.
4. Autor: biografia, retrato autorizado, especialidades e arquivo.
5. Especial: apresentação, índice e reportagens relacionadas.
6. Busca/arquivo: resultados paginados e estado vazio.
7. Multimídia: vídeos, podcasts, galerias, legendas e transcrições.
8. Institucional: expediente, política editorial, contato, privacidade, termos e correções.

## CMS e workflow
Editor com título, subtítulo, resumo, corpo, seção, tags, autoria, localização, capa, legenda, crédito, fontes, SEO e datas. Biblioteca de mídia; autosave; histórico e comparação de versões; alerta de edição simultânea; agenda; gestão de usuários; páginas; newsletter; redirecionamentos e auditoria.

Fluxo: rascunho → revisão → ajustes solicitados ou aprovado → publicação imediata/agendada → atualização ou arquivamento.

## Perfis e internacionalização
Perfis: superadministrador, administrador, editor-chefe, editor, repórter, correspondente, colunista, fotógrafo, produtor multimídia, comercial e analista. Aplicar RBAC no servidor e escopo por autoria/editoria quando necessário. Português brasileiro primeiro; registrar idioma original e localização. Usar hreflang somente entre versões equivalentes de fato.