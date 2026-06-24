async function getAvaliacaoUsuario(itemId, tipo) {
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  if (!usuario) return null;
  const res = await fetch(`${API}/avaliacoes?usuarioId=${usuario.id}&itemId=${itemId}&tipo=${tipo}`);
  const data = await res.json();
  return data[0] || null;
}

async function getMediaAvaliacao(itemId, tipo) {
  const res = await fetch(`${API}/avaliacoes?itemId=${itemId}&tipo=${tipo}`);
  const data = await res.json();
  if (!data.length) return null;
  const media = data.reduce((acc, a) => acc + a.nota, 0) / data.length;
  return { media: Math.round(media * 10) / 10, total: data.length };
}

async function avaliar(itemId, tipo, nota, container) {
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  if (!usuario) { window.location.href = "login.html"; return; }

  const existente = await getAvaliacaoUsuario(itemId, tipo);
  if (existente) {
    await fetch(`${API}/avaliacoes/${existente.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, itemId, tipo, nota })
    });
  } else {
    await fetch(`${API}/avaliacoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, itemId, tipo, nota })
    });
  }

  
  await renderizarEstrelas(itemId, tipo, container);
}

async function renderizarEstrelas(itemId, tipo, container) {
  const usuario = getUsuarioLogado ? getUsuarioLogado() : null;
  const avaliacao = usuario ? await getAvaliacaoUsuario(itemId, tipo) : null;
  const notaUsuario = avaliacao ? avaliacao.nota : 0;
  const mediaObj = await getMediaAvaliacao(itemId, tipo);

  container.innerHTML = `
    <div class="estrelas-wrapper">
      ${[1,2,3,4,5].map(i => `
        <span class="estrela ${i <= notaUsuario ? 'ativa' : ''}"
              onclick="avaliar(${itemId}, '${tipo}', ${i}, this.closest('.estrelas-wrapper').parentElement)"
              title="${i} estrela${i > 1 ? 's' : ''}">★</span>
      `).join('')}
      ${mediaObj
        ? `<span class="media-nota">${mediaObj.media} <span class="total-votos">(${mediaObj.total} voto${mediaObj.total > 1 ? 's' : ''})</span></span>`
        : `<span class="media-nota sem-votos">Sem avaliações</span>`}
    </div>
  `;
}

async function criarBlocoEstrelas(itemId, tipo) {
  const div = document.createElement("div");
  div.className = "bloco-estrelas";
  await renderizarEstrelas(itemId, tipo, div);
  return div;
}
