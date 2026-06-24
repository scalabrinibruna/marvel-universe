let todosItens = [];
let filtroTipo = "todos";

function mostrarErro() {
    document.getElementById("form-erro").classList.remove("hidden");
}

function esconderErro() {
    document.getElementById("form-erro").classList.add("hidden");
}

async function init() {

    const usuario = getUsuarioLogado();

    if (!usuario || !usuario.admin) {
        window.location.href = "index.html";
        return;
    }

    await carregarLista();
}

async function carregarLista() {

    const [filmes, series] = await Promise.all([
        fetch(`${API}/filmes`).then(r => r.json()),
        fetch(`${API}/series`).then(r => r.json())
    ]);

    todosItens = [...filmes, ...series];

    aplicarFiltros();
}

function aplicarFiltros() {

    const termo =
        document.getElementById("filtro-lista")
        .value
        .toLowerCase();

    let itens = todosItens;

    if (filtroTipo !== "todos")
        itens = itens.filter(i => i.tipo === filtroTipo);

    if (termo)
        itens = itens.filter(i =>
            i.titulo.toLowerCase().includes(termo)
        );

    renderizarLista(itens);
}

function setFiltroTipo(tipo) {

    filtroTipo = tipo;

    document
        .querySelectorAll(".btn-filtro-tipo")
        .forEach(b => b.classList.remove("active"));

    document
        .getElementById("ft-" + tipo)
        .classList.add("active");

    aplicarFiltros();
}

function renderizarLista(itens) {

    const lista =
        document.getElementById("lista-cadastro");

    lista.innerHTML = "";

    if (itens.length === 0) {

        lista.innerHTML =
            `<p class="sem-itens">
                Nenhum item encontrado.
            </p>`;
        return;
    }

    itens.forEach(item => {

        lista.innerHTML += `

        <div class="item-cadastrado">

            <div class="item-info">

                <h4>${item.titulo}</h4>

                <p>
                    ${item.tipo}
                    •
                    ${item.lancamento}
                    •
                    ${item.fase || "—"}
                </p>
            </div>

            <div class="item-acoes">
                <button
                    class="btn-editar"
                    onclick="editarItem(${item.id}, '${item.tipo}')">
                    ✏️
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirItem(${item.id}, '${item.tipo}')">
                    🗑️
                </button>
            </div>
        </div>

        `;

    });

}

async function salvarItem() {

    const id =
        document.getElementById("campo-id").value;

    const tipo =
        document.getElementById("campo-tipo").value;

    const titulo =
        document.getElementById("campo-titulo").value.trim();

    const lancamento =
        document.getElementById("campo-lancamento").value.trim();

    const duracao =
        document.getElementById("campo-duracao").value.trim();

    const plataforma =
        document.getElementById("campo-plataforma").value.trim();

    const classif =
        document.getElementById("campo-classificacao").value.trim();

    const fase =
        document.getElementById("campo-fase").value.trim();

    const imagem =
        document.getElementById("campo-imagem").value.trim();

    const sinopse =
        document.getElementById("campo-sinopse").value.trim();

    if (!titulo || !lancamento || !sinopse) {

        mostrarErro();

        return;
    }

    esconderErro();

    const endpoint =
        tipo === "Filme"
        ? "filmes"
        : "series";

    const item = {
        titulo,
        tipo,
        lancamento,
        duracao,
        plataforma,
        classificacao: classif,
        fase,
        imagem,
        sinopse,
        em_breve: false,
        personagens: []
    };

    if (id) {

        await fetch(`${API}/${endpoint}/${id}`, {

            method: "PUT",
            headers: {
                "Content-Type":
                "application/json"
            },
            body: JSON.stringify({

                ...item,

                id: Number(id)

            })
        });

    } else {

        await fetch(`${API}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type":
                "application/json"
            },
            body: JSON.stringify(item)

        });

    }

    limparForm();

    await carregarLista();
}

async function editarItem(id, tipo) {

    const endpoint =
        tipo === "Filme"
        ? "filmes"
        : "series";

    const item =
        await fetch(`${API}/${endpoint}/${id}`)
        .then(r => r.json());

    document.getElementById("campo-id").value = item.id;
    document.getElementById("campo-titulo").value = item.titulo;
    document.getElementById("campo-tipo").value = item.tipo;
    document.getElementById("campo-lancamento").value = item.lancamento;
    document.getElementById("campo-duracao").value = item.duracao || "";
    document.getElementById("campo-plataforma").value = item.plataforma || "";
    document.getElementById("campo-classificacao").value = item.classificacao || "";
    document.getElementById("campo-fase").value = item.fase || "";
    document.getElementById("campo-imagem").value = item.imagem || "";
    document.getElementById("campo-sinopse").value = item.sinopse || "";

    document.getElementById("form-titulo")
        .textContent =
        "Editando: " + item.titulo;

    esconderErro();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function excluirItem(id, tipo) {

    if (!confirm(
        "Excluir este item permanentemente?"
    )) return;

    const endpoint =
        tipo === "Filme"
        ? "filmes"
        : "series";

    await fetch(
        `${API}/${endpoint}/${id}`,
        {
            method: "DELETE"
        }
    );

    await carregarLista();
}

function limparForm() {

    [
        "campo-id",
        "campo-titulo",
        "campo-lancamento",
        "campo-duracao",
        "campo-plataforma",
        "campo-classificacao",
        "campo-fase",
        "campo-imagem",
        "campo-sinopse"
    ].forEach(id => {
        document.getElementById(id).value = "";
    });

    document.getElementById("campo-tipo").value =
        "Filme";

    document.getElementById("form-titulo")
        .textContent =
        "Novo Item";

    esconderErro();
}

init();