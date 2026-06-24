(function verificarServidor() {
  fetch(`${API}/filmes?_limit=1`)
    .then(res => { if (!res.ok) throw new Error(); })
    .catch(() => {
      if (document.getElementById("aviso-servidor")) return;
      const aviso = document.createElement("div");
      aviso.id = "aviso-servidor";
      aviso.className = "aviso-servidor";
      aviso.innerHTML = `
        <span>ATENÇÃO: JSON Server não está rodando.</strong>
        Execute no terminal: <code>npm start</code></span>
        <button onclick="location.reload()" class="btn-aviso-servidor">Tentar novamente</button>
      `;
      document.body.insertBefore(aviso, document.body.firstChild);
    });
})();

let filmes = [];
let series = [];
let ordemFilmes = "cronologica";
let ordemSeries = "cronologica";

async function init() {
  await carregarDados();
  await carregarFilmes();
  await carregarSeries();
  carregarCarousel();
  carregarDetalhes();
  iniciarPesquisa();
  atualizarMenu();
  montarGraficosHome();
}



function montarGraficosHome() {
  if (!document.getElementById("graficoFasesHome")) return;

  
  const filmesReais = filmes.filter(f => !f.em_breve);
  const seriesReais = series.filter(s => !s.em_breve);
  const elFilmes = document.getElementById("total-filmes");
  const elSeries = document.getElementById("total-series");
  if (elFilmes) elFilmes.textContent = filmesReais.length;
  if (elSeries) elSeries.textContent = seriesReais.length;

  const fases = ["Fase 1", "Fase 2", "Fase 3", "Fase 4", "Fase 5", "Fase 6"];
  const filmesPorFase = fases.map(f => filmesReais.filter(i => i.fase === f).length);
  const seriesPorFase = fases.map(f => seriesReais.filter(i => i.fase === f).length);

  new Chart(document.getElementById("graficoFasesHome").getContext("2d"), {
    type: "bar",
    data: {
      labels: fases,
      datasets: [
        { label: "Filmes", data: filmesPorFase, backgroundColor: "#e62429", borderRadius: 6 },
        { label: "Séries", data: seriesPorFase, backgroundColor: "#555",    borderRadius: 6 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "white" } } },
      scales: {
        x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.07)" } },
        y: { ticks: { color: "white", stepSize: 1 }, grid: { color: "rgba(255,255,255,0.07)" }, beginAtZero: true }
      }
    }
  });

}

async function carregarDados() {
  const [resFilmes, resSeries] = await Promise.all([
    fetch(`${API}/filmes`),
    fetch(`${API}/series`)
  ]);
  filmes = await resFilmes.json();
  series = await resSeries.json();
}

function atualizarMenu() {
  const nav = document.getElementById("menu-dinamico");
  if (!nav) return;
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  let html = `
    <li class="nav-item"><a class="nav-link" href="#">Início</a></li>
    <li class="nav-item"><a class="nav-link" href="#destaques">Em Breve</a></li>
    <li class="nav-item"><a class="nav-link" href="#filmes">Filmes</a></li>
    <li class="nav-item"><a class="nav-link" href="#series">Séries</a></li>
    <li class="nav-item"><a class="nav-link" href="graficos.html">Gráficos</a></li>
    <li class="nav-item"><a class="nav-link" href="quiz.html">Quiz</a></li>
  `;
  if (usuario) {
    html += `<li class="nav-item"><a class="nav-link" href="favoritos.html">Favoritos</a></li>`;
    if (usuario.admin) html += `<li class="nav-item"><a class="nav-link" href="cadastro_itens.html">Cadastro</a></li>`;
    html += `<li class="nav-item"><a class="nav-link" href="#" onclick="logout(); return false;">Sair (${usuario.nome})</a></li>`;
  } else {
    html += `<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>`;
  }
  nav.innerHTML = html;
}



function setOrdemFilmes(ordem) {
  ordemFilmes = ordem;
  document.querySelectorAll(".btn-ordem-filmes").forEach(b => b.classList.remove("active"));
  document.getElementById("bf-" + ordem)?.classList.add("active");
  carregarFilmes();
}

function setOrdemSeries(ordem) {
  ordemSeries = ordem;
  document.querySelectorAll(".btn-ordem-series").forEach(b => b.classList.remove("active"));
  document.getElementById("bs-" + ordem)?.classList.add("active");
  carregarSeries();
}


function lancamentoParaNumero(lancamento) {
  const str = lancamento?.toString().trim() ?? "";

  
  const partesSlash = str.split("/").map(p => parseInt(p, 10));
  if (partesSlash.length === 3) {
    const [dia, mes, ano] = partesSlash;
    if (!isNaN(ano) && !isNaN(mes) && !isNaN(dia)) return ano * 10000 + mes * 100 + dia;
  }
  if (partesSlash.length === 2) {
    const [mes, ano] = partesSlash;
    if (!isNaN(ano) && !isNaN(mes)) return ano * 10000 + mes * 100;
  }

  
  const apenasAno = parseInt(str.substring(0, 4), 10);
  return isNaN(apenasAno) ? 99999999 : apenasAno * 10000;
}

async function ordenarItens(itens, ordem) {
  if (ordem === "lancamento") {
    return [...itens].sort((a, b) =>
      lancamentoParaNumero(a.lancamento) - lancamentoParaNumero(b.lancamento)
    );
  }
  if (ordem === "avaliacao") {
    const medias = await Promise.all(itens.map(async item => {
      const res = await fetch(`${API}/avaliacoes?itemId=${item.id}&tipo=${item.tipo}`);
      const data = await res.json();
      const media = data.length ? data.reduce((a, b) => a + b.nota, 0) / data.length : 0;
      return { id: item.id, media };
    }));
    return [...itens].sort((a, b) => {
      const ma = medias.find(m => m.id === a.id)?.media || 0;
      const mb = medias.find(m => m.id === b.id)?.media || 0;
      return mb - ma;
    });
  }
  
  return [...itens].sort((a, b) => a.id - b.id);
}



async function getFavoritos() {
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  if (!usuario) return [];
  const res = await fetch(`${API}/favoritos?usuarioId=${usuario.id}`);
  return await res.json();
}

async function toggleFavorito(itemId, tipo, btn) {
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  if (!usuario) { window.location.href = "login.html"; return; }
  const favoritos = await getFavoritos();
  const existente = favoritos.find(f => f.itemId == itemId && f.tipo === tipo);
  if (existente) {
    await fetch(`${API}/favoritos/${existente.id}`, { method: "DELETE" });
    btn.textContent = "🤍";
  } else {
    await fetch(`${API}/favoritos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, itemId, tipo })
    });
    btn.textContent = "❤️";
  }
}



async function carregarFilmes() {
  const lista = document.getElementById("lista-filmes");
  if (!lista) return;
  const favoritos = await getFavoritos();
  lista.innerHTML = `<p class="text-secondary carregando-msg">Carregando...</p>`;
  const itens = await ordenarItens(filmes.filter(f => !f.em_breve), ordemFilmes);
  lista.innerHTML = "";
  for (const filme of itens) {
    const isFav = favoritos.some(f => f.itemId == filme.id && f.tipo === "Filme");
    const mediaObj = await getMediaAvaliacao(filme.id, "Filme");
    const mediaHTML = mediaObj
      ? `<span class="media-card">★ ${mediaObj.media} <span class="total-votos-card">(${mediaObj.total})</span></span>`
      : `<span class="media-card sem-votos">★ Sem avaliações</span>`;
    lista.innerHTML += `
      <div class="card-marvel-container">
        <div class="card card-marvel">
          <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
          <div class="card-body">
            <h5 class="card-title">${filme.titulo}</h5>
            <p class="card-text">${filme.lancamento}</p>
            ${mediaHTML}
            <div class="d-flex gap-2 justify-content-center mt-2">
              <a href="detalhes.html?id=${filme.id}&tipo=Filme&origem=filmes&ordem=${ordemFilmes}" class="btn btn-danger btn-sm">Ver detalhes</a>
              <button class="btn-favorito" onclick="toggleFavorito(${filme.id}, 'Filme', this)">${isFav ? "❤️" : "🤍"}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

async function carregarSeries() {
  const lista = document.getElementById("lista-series");
  if (!lista) return;
  const favoritos = await getFavoritos();
  lista.innerHTML = `<p class="text-secondary carregando-msg">Carregando...</p>`;
  const itens = await ordenarItens(series.filter(s => !s.em_breve), ordemSeries);
  lista.innerHTML = "";
  for (const serie of itens) {
    const isFav = favoritos.some(f => f.itemId == serie.id && f.tipo === "Série");
    const mediaObj = await getMediaAvaliacao(serie.id, "Série");
    const mediaHTML = mediaObj
      ? `<span class="media-card">★ ${mediaObj.media} <span class="total-votos-card">(${mediaObj.total})</span></span>`
      : `<span class="media-card sem-votos">★ Sem avaliações</span>`;
    lista.innerHTML += `
      <div class="card-marvel-container">
        <div class="card card-marvel">
          <img src="${serie.imagem}" class="card-img-top" alt="${serie.titulo}">
          <div class="card-body">
            <h5 class="card-title">${serie.titulo}</h5>
            <p class="card-text">${serie.lancamento}</p>
            ${mediaHTML}
            <div class="d-flex gap-2 justify-content-center mt-2">
              <a href="detalhes.html?id=${serie.id}&tipo=Série&origem=series&ordem=${ordemSeries}" class="btn btn-danger btn-sm">Ver detalhes</a>
              <button class="btn-favorito" onclick="toggleFavorito(${serie.id}, 'Série', this)">${isFav ? "❤️" : "🤍"}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}



function carregarCarousel() {
  const carouselEl = document.getElementById("carouselMarvel");
  if (!carouselEl) return;
  const emBreve = [...filmes, ...series].filter(i => i.em_breve);
  if (!emBreve.length) {
    carouselEl.innerHTML = `<div class="bg-fallback"><p class="text-secondary">Nenhum item em breve.</p></div>`;
    return;
  }
  let indicadores = `<div class="carousel-indicators">`;
  emBreve.forEach((item, i) => {
    indicadores += `<button type="button" data-bs-target="#carouselMarvel" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}" aria-label="${item.titulo}"></button>`;
  });
  indicadores += `</div>`;
  let slides = `<div class="carousel-inner">`;
  emBreve.forEach((item, i) => {
    slides += `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <a href="detalhes.html?id=${item.id}&tipo=${item.tipo || 'Filme'}" class="carousel-link">
          <img src="${item.imagem}" class="d-block w-100 imagem-carousel" alt="${item.titulo}">
        </a>
        <div class="carousel-caption d-none d-md-block">
          <h5 class="text-white fw-bold">${item.titulo}</h5>
          <p>${item.sinopse || ""}</p>
        </div>
      </div>`;
  });
  slides += `</div>`;
  carouselEl.innerHTML = indicadores + slides +
    `<button class="carousel-control-prev" type="button" data-bs-target="#carouselMarvel" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>` +
    `<button class="carousel-control-next" type="button" data-bs-target="#carouselMarvel" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>`;
}



async function carregarDetalhes() {
  const detalhes = document.getElementById("detalhes");
  if (!detalhes) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const tipo = params.get("tipo");
  const origem = params.get("origem") || "todos";
  const ordem = params.get("ordem") || "cronologica";

  let listaBase = [];

  if (origem === "filmes") {
    listaBase = filmes;
  } else if (origem === "series") {
    listaBase = series;
  } else {
    listaBase = [...filmes, ...series];
  }

  const listaOrdenada = await ordenarItens(listaBase, ordem);

  const idxAtual = listaOrdenada.findIndex(
    el => el.id == id && (!tipo || el.tipo === tipo)
  );

  const item = listaOrdenada[idxAtual];

  if (!item) {
    detalhes.innerHTML = `<h1 class="text-danger">Item não encontrado</h1>`;
    return;
  }

  document.title = item.titulo + " — Marvel Universe";


  
  const anterior = idxAtual > 0 ? listaOrdenada[idxAtual - 1] : null;
  const proximo  = idxAtual < listaOrdenada.length - 1 ? listaOrdenada[idxAtual + 1] : null;

  function urlItem(it) {
    return `detalhes.html?id=${it.id}&tipo=${encodeURIComponent(it.tipo)}&origem=${origem}&ordem=${ordem}`;
  }

  const navHTML = `
    <div class="nav-detalhes d-flex justify-content-between align-items-center mb-4">
      ${anterior
        ? `<a href="${urlItem(anterior)}" class="btn-nav-detalhe btn-nav-anterior">
             ← ${anterior.titulo}
           </a>`
        : `<span class="btn-nav-detalhe btn-nav-desabilitado">← Primeiro</span>`}
      <span class="nav-posicao text-secondary">${idxAtual + 1} / ${listaOrdenada.length}</span>
      ${proximo
        ? `<a href="${urlItem(proximo)}" class="btn-nav-detalhe btn-nav-proximo">
             ${proximo.titulo} →
           </a>`
        : `<span class="btn-nav-detalhe btn-nav-desabilitado">Último →</span>`}
    </div>`;

  const favoritos = await getFavoritos();
  const isFav = favoritos.some(f => f.itemId == item.id && f.tipo === item.tipo);
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  const avaliacao = usuario ? await getAvaliacaoUsuario(item.id, item.tipo) : null;
  const notaUsuario = avaliacao ? avaliacao.nota : 0;
  const mediaObj = await getMediaAvaliacao(item.id, item.tipo);

  const avaliacaoComunidadeHTML = mediaObj
    ? `Avaliação da comunidade: <strong>★ ${mediaObj.media}</strong> (${mediaObj.total} voto${mediaObj.total > 1 ? 's' : ''})`
    : 'Seja o primeiro a avaliar!';

  const avaliacaoUsuarioHTML = usuario
    ? `<span class="avaliacao-login-label">Sua nota:</span>
       ${[1,2,3,4,5].map(i => `
         <span class="estrela-detalhe ${i <= notaUsuario ? 'ativa' : ''}"
               onclick="avaliarDetalhe(${item.id}, '${item.tipo}', ${i})"
               title="${i} estrela${i > 1 ? 's' : ''}">★</span>
       `).join('')}`
    : `<a href="login.html" class="avaliacao-login-link">Login</a><span class="avaliacao-login-label"> para avaliar</span>`;

  let personagensHTML = item.personagens?.length
    ? item.personagens.map(p => `
        <div class="personagem">
          <img src="${p.imagem}" class="img-personagem" alt="${p.nome}">
          <p class="nome-personagem">${p.nome}</p>
        </div>`).join("")
    : `<p class="text-secondary">Personagens ainda não divulgados.</p>`;

  detalhes.innerHTML = navHTML + `
    <div class="row mb-4 align-items-center">
      <div class="col-md-4 text-center mb-3 mb-md-0">
        <img src="${item.imagem}" class="img-fluid rounded shadow" alt="${item.titulo}">
      </div>
      <div class="col-md-8 d-flex flex-column justify-content-center">
        <div class="d-flex align-items-center gap-3 mb-2">
          <h1 class="text-danger mb-0">${item.titulo}</h1>
          <button class="btn-favorito-detalhe" onclick="toggleFavorito(${item.id}, '${item.tipo}', this)">${isFav ? "❤️" : "🤍"}</button>
        </div>
        <p class="text-light opacity-75 fs-5">${item.sinopse}</p>

        <div class="bloco-avaliacao-detalhe mt-2">
          <p class="avaliacao-label mb-1" id="label-avaliacao-comunidade">${avaliacaoComunidadeHTML}</p>
          <div class="d-flex align-items-center gap-1">
            ${avaliacaoUsuarioHTML}
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-12">
        <h3 class="text-danger mb-3">Informações</h3>
        <div class="d-flex flex-wrap gap-3">
          <div class="info-box"><strong>Tipo:</strong><br>${item.tipo}</div>
          <div class="info-box"><strong>Lançamento:</strong><br>${item.lancamento}</div>
          <div class="info-box"><strong>Duração:</strong><br>${item.duracao || "—"}</div>
          <div class="info-box"><strong>Plataforma:</strong><br>${item.plataforma || "—"}</div>
          <div class="info-box"><strong>Classificação:</strong><br>${item.classificacao || "—"}</div>
          <div class="info-box"><strong>Fase do MCU:</strong><br>${item.fase || "—"}</div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h3 class="text-danger mb-3">Personagens</h3>
        <div class="personagens-lista">${personagensHTML}</div>
      </div>
    </div>
  `;
}

async function avaliarDetalhe(itemId, tipo, nota) {
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  if (!usuario) { window.location.href = "login.html"; return; }
  const existente = await getAvaliacaoUsuario(itemId, tipo);
  if (existente) {
    await fetch(`${API}/avaliacoes/${existente.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, itemId, tipo, nota })
    });
  } else {
    await fetch(`${API}/avaliacoes`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, itemId, tipo, nota })
    });
  }
  document.querySelectorAll(".estrela-detalhe").forEach((el, i) => {
    el.classList.toggle("ativa", i < nota);
  });
  const mediaObj = await getMediaAvaliacao(itemId, tipo);
  const label = document.getElementById("label-avaliacao-comunidade");
  if (label && mediaObj) {
    label.innerHTML = `Avaliação da comunidade: <strong>★ ${mediaObj.media}</strong> (${mediaObj.total} voto${mediaObj.total > 1 ? 's' : ''})`;
  }
}



function iniciarPesquisa() {
  const input = document.getElementById("input-pesquisa");
  if (!input) return;
  input.addEventListener("input", function () {
    const termo = input.value.toLowerCase().trim();
    const secaoResultados = document.getElementById("resultados-pesquisa");
    const listaResultados = document.getElementById("lista-resultados");
    const secaoFilmes = document.getElementById("filmes");
    const secaoSeries = document.getElementById("series");
    const secaoDestaques = document.getElementById("destaques");
    const secaoOrdem = document.getElementById("secao-ordem");
    if (termo === "") {
      secaoResultados.classList.add("hidden");
      if (secaoFilmes) secaoFilmes.classList.remove("hidden");
      if (secaoSeries) secaoSeries.classList.remove("hidden");
      if (secaoDestaques) secaoDestaques.classList.remove("hidden");
      if (secaoOrdem) secaoOrdem.classList.remove("hidden");
      return;
    }
    secaoResultados.classList.remove("hidden");
    secaoResultados.scrollIntoView({ behavior: "smooth", block: "start" });
    if (secaoFilmes) secaoFilmes.classList.add("hidden");
    if (secaoSeries) secaoSeries.classList.add("hidden");
    if (secaoDestaques) secaoDestaques.classList.add("hidden");
    if (secaoOrdem) secaoOrdem.classList.add("hidden");
    const resultados = [...filmes, ...series].filter(item =>
      item.titulo.toLowerCase().includes(termo)
    );
    listaResultados.innerHTML = "";
    if (!resultados.length) {
      listaResultados.innerHTML = `<p class="text-secondary">Nenhum resultado para "<strong>${input.value}</strong>".</p>`;
      return;
    }
    resultados.forEach(item => {
      listaResultados.innerHTML += `
        <div class="card-marvel-container">
          <div class="card card-marvel">
            <img src="${item.imagem}" class="card-img-top" alt="${item.titulo}">
            <div class="card-body">
              <h5 class="card-title">${item.titulo}</h5>
              <p class="card-text">${item.lancamento} — ${item.tipo}</p>
              <a href="detalhes.html?id=${item.id}&tipo=${item.tipo}&origem=todos&ordem=cronologica" class="btn btn-danger btn-sm">Ver detalhes</a>
            </div>
          </div>
        </div>`;
    });
  });
}

function rolarDireita(id) { document.getElementById(id).scrollBy({ left: 500, behavior: "smooth" }); }
function rolarEsquerda(id) { document.getElementById(id).scrollBy({ left: -500, behavior: "smooth" }); }

init();