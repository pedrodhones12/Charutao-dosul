const FEED_URL = 'https://charutao-do-sul-a722b243.base44.app/functions/portalFeed';
const SITE_URL = 'https://pedrodhones12.github.io/Charutao-dosul/';

const SECTIONS = [
  { id: 'brasil', label: 'Brasil & Mundo', categories: ['brasil', 'brasil & mundo', 'mundo', 'politica', 'política', 'economia', 'internacional'] },
  { id: 'bahia', label: 'Bahia & Sul da Bahia', categories: ['bahia', 'sul da bahia', 'regional', 'cidades'] },
  { id: 'cultura', label: 'Cultura, Literatura & Educação', categories: ['cultura', 'literatura', 'educação', 'educacao', 'música', 'musica', 'arte', 'livros'] },
  { id: 'tecnologia', label: 'Tecnologia & Ciência', categories: ['tecnologia', 'ciência', 'ciencia', 'meio ambiente', 'saúde', 'saude'] },
  { id: 'especiais', label: 'Reportagens especiais', categories: ['especiais', 'reportagens especiais', 'entrevistas', 'opinião', 'opiniao'] }
];

const state = { posts: [] };

function q(selector) { return document.querySelector(selector); }

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null && text !== '') node.textContent = text;
  return node;
}

function photo(src, alt, className) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt || '';
  img.loading = 'lazy';
  if (className) img.className = className;
  return img;
}

function articleUrl(post) { return SITE_URL + '?slug=' + encodeURIComponent(post.slug || post.id || ''); }

function dateLabel(value) {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}

function byline(post) {
  const author = post.author || 'Redação Charutão do Sul';
  const date = dateLabel(post.published_at);
  return date ? author + ' · ' + date : author;
}

function searchIndex(post) {
  return [post.title, post.excerpt, post.category, post.author, post.sponsor_name].filter(Boolean).join(' ').toLowerCase();
}

function storyBox(post) {
  const box = el('div', 'story-image');
  if (post.cover_image) box.appendChild(photo(post.cover_image, post.title));
  box.appendChild(el('span', null, post.category || 'DESTAQUE'));
  return box;
}

function listCard(post) {
  const card = el('article', 'list-story story-card');
  const thumb = el('div', 'thumb');
  if (post.cover_image) thumb.appendChild(photo(post.cover_image, post.title));
  const body = el('div');
  body.appendChild(el('p', 'eyebrow', post.category || 'Editoria'));
  const title = el('h3');
  const link = el('a', null, post.title);
  link.href = articleUrl(post);
  title.appendChild(link);
  body.appendChild(title);
  if (post.excerpt) body.appendChild(el('p', 'summary', post.excerpt));
  body.appendChild(el('p', 'byline', byline(post)));
  card.appendChild(thumb);
  card.appendChild(body);
  return card;
}

function heroCard(post) {
  const card = el('article', 'lead-story story-card');
  const copy = el('div', 'lead-copy');
  copy.appendChild(el('p', 'eyebrow', (post.category || 'Destaque').toUpperCase()));
  const title = el('h2');
  const link = el('a', null, post.title);
  link.href = articleUrl(post);
  title.appendChild(link);
  copy.appendChild(title);
  if (post.excerpt) copy.appendChild(el('p', 'summary', post.excerpt));
  copy.appendChild(el('p', 'byline', byline(post)));
  card.appendChild(storyBox(post));
  card.appendChild(copy);
  return card;
}

function sideCard(post) {
  const card = el('article', 'side-story story-card');
  const copy = el('div');
  copy.appendChild(el('p', 'eyebrow', (post.category || 'Destaque').toUpperCase()));
  const title = el('h2');
  const link = el('a', null, post.title);
  link.href = articleUrl(post);
  title.appendChild(link);
  copy.appendChild(title);
  copy.appendChild(el('p', 'byline', byline(post)));
  card.appendChild(storyBox(post));
  card.appendChild(copy);
  return card;
}

function addNavItem(label, href) {
  const link = el('a', null, label);
  link.href = href;
  q('#nav-inner').appendChild(link);
}

function categoryId(label) {
  const slug = String(label || 'editoria').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug || 'editoria';
}

function matchesSection(section, post) {
  return section.categories.indexOf(String(post.category || '').trim().toLowerCase()) !== -1;
}

function renderSections(posts) {
  const container = q('#editorias');
  container.replaceChildren();
  q('#nav-inner').replaceChildren();
  addNavItem('Últimas', '#ultimas');
  const groups = [];
  const placed = [];
  SECTIONS.forEach((section) => {
    const items = posts.filter((post) => matchesSection(section, post));
    if (!items.length) return;
    items.forEach((post) => placed.push(post.id));
    groups.push({ id: section.id, label: section.label, posts: items });
  });
  const leftovers = new Map();
  posts.filter((post) => placed.indexOf(post.id) === -1).forEach((post) => {
    const label = post.category || 'Outras editorias';
    if (!leftovers.has(label)) leftovers.set(label, []);
    leftovers.get(label).push(post);
  });
  leftovers.forEach((items, label) => groups.push({ id: categoryId(label), label: label, posts: items }));
  groups.forEach((group) => {
    const block = el('section', 'section-block');
    block.id = group.id;
    const heading = el('div', 'section-heading');
    heading.appendChild(el('h2', null, group.label));
    heading.appendChild(el('span', 'section-note', group.posts.length === 1 ? '1 matéria' : group.posts.length + ' matérias'));
    block.appendChild(heading);
    const list = el('div', 'article-list');
    group.posts.forEach((post) => list.appendChild(listCard(post)));
    block.appendChild(list);
    container.appendChild(block);
    addNavItem(group.label, '#' + group.id);
  });
}

function renderSponsors(sponsors) {
  const box = q('#patrocinadores');
  const row = q('#sponsor-row');
  row.replaceChildren();
  if (!sponsors.length) { box.hidden = true; return; }
  box.hidden = false;
  sponsors.forEach((sponsor) => {
    const card = el('a', 'sponsor-card');
    card.href = sponsor.website_url || '#';
    if (sponsor.website_url) { card.target = '_blank'; card.rel = 'noopener noreferrer'; }
    if (sponsor.logo_url) card.appendChild(photo(sponsor.logo_url, sponsor.name, 'sponsor-logo'));
    const info = el('span');
    info.appendChild(el('strong', null, sponsor.name || 'Patrocinador'));
    if (sponsor.description) info.appendChild(el('small', null, sponsor.description));
    card.appendChild(info);
    row.appendChild(card);
  });
}

async function loadHome() {
  const response = await fetch(FEED_URL, { cache: 'no-store' });
  const data = await response.json();
  const posts = data.posts || [];
  state.posts = posts;
  renderSponsors(data.sponsors || []);
  q('#edition-note').textContent = posts.length === 1 ? '1 matéria publicada' : posts.length + ' matérias publicadas';
  renderSections(posts);
  if (!posts.length) {
    q('#lead-grid').hidden = true;
    q('#empty-state').hidden = false;
    q('#ticker-text').textContent = 'Nenhuma matéria publicada ainda.';
    return;
  }
  const sorted = posts.slice().sort((a, b) => new Date(b.published_at || 0) - new Date(a.published_at || 0));
  const hero = sorted.find((post) => post.home_slot === 'hero') || sorted[0];
  const heroNode = heroCard(hero);
  heroNode.id = 'hero-story';
  q('#hero-story').replaceWith(heroNode);
  const aside = sorted.filter((post) => post.id !== hero.id && post.home_slot === 'aside');
  sorted.filter((post) => post.id !== hero.id && post.home_slot !== 'none' && aside.indexOf(post) === -1).slice(0, Math.max(0, 3 - aside.length)).forEach((post) => aside.push(post));
  const side = q('#side-leads');
  side.replaceChildren();
  aside.slice(0, 3).forEach((post) => side.appendChild(sideCard(post)));
  q('#lead-grid').hidden = false;
  const ticker = q('#ticker-text');
  ticker.replaceChildren();
  sorted.slice(0, 3).forEach((post, index) => {
    if (index) ticker.appendChild(document.createTextNode(' · '));
    const link = el('a', null, post.title);
    link.href = articleUrl(post);
    ticker.appendChild(link);
  });
}

function renderArticleNav() {
  const nav = q('#nav-inner');
  nav.replaceChildren();
  const home = el('a', null, 'Início');
  home.href = SITE_URL;
  nav.appendChild(home);
  SECTIONS.forEach((section) => {
    const link = el('a', null, section.label);
    link.href = SITE_URL + '#' + section.id;
    nav.appendChild(link);
  });
}

function showArticleMessage(message) {
  q('#home-view').hidden = true;
  const view = q('#article-view');
  view.hidden = false;
  view.replaceChildren();
  const back = el('a', 'back-link', '← Voltar ao portal');
  back.href = SITE_URL;
  view.appendChild(back);
  view.appendChild(el('p', 'empty-state', message));
}

async function sharePost(post) {
  const url = articleUrl(post);
  if (navigator.share) {
    try { await navigator.share({ title: post.title, text: post.excerpt, url: url }); return; } catch (error) { return; }
  }
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
    alert('Link copiado para compartilhar.');
  }
}

async function loadArticle(slug) {
  const response = await fetch(FEED_URL + '?slug=' + encodeURIComponent(slug), { cache: 'no-store' });
  if (!response.ok) { showArticleMessage('Matéria não encontrada.'); return; }
  const data = await response.json();
  const post = data.post;
  if (!post) { showArticleMessage('Matéria não encontrada.'); return; }
  document.title = (post.seo_title || post.title) + ' | Charutão do Sul';
  const description = post.seo_description || post.excerpt;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && description) meta.setAttribute('content', description);
  q('#home-view').hidden = true;
  const view = q('#article-view');
  view.hidden = false;
  view.replaceChildren();
  const back = el('a', 'back-link', '← Voltar ao portal');
  back.href = SITE_URL;
  view.appendChild(back);
  view.appendChild(el('span', 'category-tag', (post.category || 'Editoria').toUpperCase()));
  view.appendChild(el('h1', 'article-title', post.title));
  if (post.excerpt) view.appendChild(el('p', 'article-deck', post.excerpt));
  const metaLine = el('div', 'article-meta');
  metaLine.appendChild(el('span', null, 'Por ' + byline(post)));
  if (post.allow_sharing !== false) {
    const share = el('button', 'share-btn', 'Compartilhar');
    share.type = 'button';
    share.addEventListener('click', () => sharePost(post));
    metaLine.appendChild(share);
  }
  view.appendChild(metaLine);
  if (post.cover_image) view.appendChild(photo(post.cover_image, post.title, 'article-cover'));
  const body = el('article', 'article-body');
  (post.body || '').split('\n').filter((line) => line.trim()).forEach((line) => {
    const inline = line.trim().match(/^!\[(.*?)\]\((\S+)\)$/);
    if (inline) {
      const figure = el('figure', 'article-figure');
      figure.appendChild(photo(inline[2], inline[1] || post.title, 'article-photo'));
      if (inline[1]) figure.appendChild(el('figcaption', null, inline[1]));
      body.appendChild(figure);
      return;
    }
    body.appendChild(el('p', null, line));
  });
  if (!body.children.length) body.appendChild(el('p', null, 'Conteúdo em preparação.'));
  view.appendChild(body);
  if (post.video_url) {
    const box = el('div', 'video-link');
    const link = el('a', null, 'Assistir vídeo relacionado');
    link.href = post.video_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    box.appendChild(link);
    view.appendChild(box);
  }
  if ((post.attachments || []).length) {
    const box = el('section', 'attachment-list');
    box.appendChild(el('h3', null, 'Documentos e materiais'));
    post.attachments.forEach((file) => {
      const link = el('a', null, file.name || file.url);
      link.href = file.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      box.appendChild(link);
    });
    view.appendChild(box);
  }
}

function runSearch(term) {
  const results = q('#search-results');
  results.hidden = false;
  results.replaceChildren();
  results.appendChild(el('h2', null, 'Busca no portal'));
  if (!term) {
    results.appendChild(el('p', null, 'Digite um termo para procurar títulos, editorias e resumos das matérias publicadas.'));
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  const found = state.posts.filter((post) => searchIndex(post).indexOf(term) !== -1);
  results.appendChild(el('p', null, found.length ? (found.length === 1 ? '1 matéria encontrada para: ' : found.length + ' matérias encontradas para: ') + term : 'Nenhuma matéria encontrada para: ' + term));
  if (found.length) {
    const list = el('ul');
    found.forEach((post) => {
      const item = el('li');
      const link = el('a', null, post.title + (post.category ? ' — ' + post.category : ''));
      link.href = articleUrl(post);
      item.appendChild(link);
      list.appendChild(item);
    });
    results.appendChild(list);
  }
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setupUi() {
  const menuToggle = q('#menu-toggle');
  const nav = q('#main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }
  const searchForm = q('#search-form');
  const searchInput = q('#search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      runSearch(searchInput.value.trim().toLowerCase());
    });
  }
  const newsletter = q('#newsletter-form');
  if (newsletter) {
    newsletter.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = q('#form-message');
      if (message) message.textContent = 'A inscrição no boletim será ativada em breve. Enquanto isso, acompanhe as matérias publicadas no portal.';
    });
  }
  const year = q('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const today = q('#today-label');
  if (today) today.textContent = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date());
}

function start() {
  setupUi();
  const slug = new URLSearchParams(window.location.search).get('slug');
  if (slug) {
    renderArticleNav();
    return loadArticle(slug);
  }
  return loadHome();
}

start().catch(() => {
  const message = 'Não foi possível carregar as matérias publicadas agora. Recarregue a página em instantes.';
  const article = q('#article-view');
  if (article && !article.hidden) showArticleMessage(message);
  else q('#ticker-text').textContent = message;
});
