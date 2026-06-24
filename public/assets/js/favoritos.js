async function carregarFavoritos() {
    const usuario = getUsuarioLogado();

    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    const lista = document.getElementById("lista-favoritos");
    lista.innerHTML = `<p class="text-secondary carregando-msg">Carregando...</p>`;

    const favoritos = await fetch(`${API}/favoritos?usuarioId=${usuario.id}`)
        .then(r => r.json());

    const [filmes, series] = await Promise.all([
        fetch(`${API}/filmes`).then(r => r.json()),
        fetch(`${API}/series`).then(r => r.json())
    ]);

    const catalogo = [...filmes, ...series];

    lista.innerHTML = "";

    if (favoritos.length === 0) {
        lista.innerHTML = `
            <div class="text-center py-5">
                <h4 class="text-danger mb-3">Nenhum favorito ainda</h4>
                <p class="text-secondary">
                    Adicione filmes e séries aos seus favoritos para vê-los aqui.
                </p>
                <a href="index.html" class="btn btn-danger">
                    Explorar catálogo
                </a>
            </div>
        `;
        return;
    }

    favoritos.forEach(fav => {
        const item = catalogo.find(
            i => i.id == fav.itemId && i.tipo === fav.tipo
        );

        if (!item) return;

        lista.innerHTML += `
            <div class="card-marvel-container">
                <div class="card card-marvel">

                    <img src="${item.imagem}"
                         class="card-img-top"
                         alt="${item.titulo}">

                    <div class="card-body">

                        <h5 class="card-title">
                            ${item.titulo}
                        </h5>

                        <p class="card-text">
                            ${item.lancamento} — ${item.tipo}
                        </p>

                        <div class="d-flex gap-2 justify-content-center mt-2">

                            <a href="detalhes.html?id=${item.id}&tipo=${item.tipo}"
                               class="btn btn-danger btn-sm">
                                Ver detalhes
                            </a>

                            <button
                                class="btn-favorito"
                                onclick="removerFavorito(${fav.id}, this)"
                                title="Remover dos favoritos">
                                ❤️
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        `;
    });

    const btnPrev = document.getElementById("fav-prev");
    const btnNext = document.getElementById("fav-next");

    btnPrev?.addEventListener("click", () => {
        lista.scrollBy({
            left: -1000,
            behavior: "smooth"
        });
    });

    btnNext?.addEventListener("click", () => {
        lista.scrollBy({
            left: 1000,
            behavior: "smooth"
        });
    });
}

async function removerFavorito(favId, btn) {
    await fetch(`${API}/favoritos/${favId}`, {
        method: "DELETE"
    });

    btn.closest(".card-marvel-container").remove();

    const lista = document.getElementById("lista-favoritos");

    if (lista.children.length === 0) {
        lista.innerHTML = `
            <div class="text-center py-5">
                <h4 class="text-danger mb-3">
                    Nenhum favorito ainda
                </h4>
                <p class="text-secondary">
                    Adicione filmes e séries aos seus favoritos.
                </p>
                <a href="index.html" class="btn btn-danger">
                    Explorar catálogo
                </a>
            </div>
        `;
    }
}

carregarFavoritos();