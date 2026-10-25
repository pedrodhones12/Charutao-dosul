# Segurança, SEO, privacidade e acessibilidade

## Segurança
- Hash de senhas robusto (Argon2id ou equivalente); nunca guardar texto puro.
- Cookies de sessão HttpOnly, Secure e SameSite; expiração, revogação e MFA para perfis privilegiados.
- Rate limiting, proteção contra força bruta, validação no servidor e mensagens de erro cuidadosas.
- Proteção contra XSS, CSRF e SQL injection; CSP e CORS restritivos.
- Validar tamanho, MIME real e extensão de uploads; limitar dimensões e revisar metadados.
- Segredos em variáveis de ambiente/secret manager, nunca no Git ou código público.
- Autorização no servidor, privilégio mínimo, auditoria, atualizações de dependências e HTTPS.
- Backups protegidos e testes de restauração; definir RPO/RTO; separar ambientes.
- Monitoramento, alertas e plano de resposta a incidentes.

## LGPD
Publicar política de privacidade com finalidades, bases legais, retenção e direitos; minimizar dados; controlar acesso; registrar origem e base legal aplicável da newsletter; oferecer cancelamento; avaliar fornecedores, cookies, compartilhamentos e transferências; criar canal de solicitações e resposta a incidentes.

## SEO
Títulos e descrições únicos, URLs legíveis, canonical, sitemap XML, robots.txt, Open Graph, páginas 404, redirecionamentos 301 e links internos. Dados estruturados adequados ao conteúdo: NewsArticle/Article, Person, Organization e BreadcrumbList. Usar autoria, datas, créditos, fontes e política de correções. Não indexar áreas privadas nem conteúdo de teste.

## Metas de desempenho
Metas de Core Web Vitals: LCP ≤ 2,5 s; INP ≤ 200 ms; CLS ≤ 0,1. São metas futuras, não medições atuais. Otimizar imagens, fontes, cache, CDN e JavaScript e testar em dispositivos variados.

## Acessibilidade
Alvo WCAG 2.2 AA:
- HTML semântico, hierarquia de títulos, regiões e link para pular ao conteúdo.
- Operação por teclado, foco visível, contraste, zoom e responsividade.
- Texto alternativo contextual; imagens decorativas com alternativa vazia.
- Legendas e transcrições; formulários rotulados e erros acessíveis.
- Informação não dependente apenas de cor; tabelas/gráficos explicados.
- Respeitar movimento reduzido e testar com leitores de tela, teclado e pessoas com deficiência.

## Integridade editorial
Distinguir notícia, análise, opinião, publicidade e conteúdo patrocinado. Identificar autoria e fontes, contextualizar dados, corrigir erros com transparência e respeitar direitos autorais, privacidade e proteção de fontes.