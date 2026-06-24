const API = "http://localhost:3000";

function mostrarLogin() {
    document.getElementById("tela-login").classList.remove("hidden");
    document.getElementById("tela-cadastro").classList.add("hidden");
}

function mostrarCadastro() {
    document.getElementById("tela-login").classList.add("hidden");
    document.getElementById("tela-cadastro").classList.remove("hidden");
}

async function fazerLogin() {

    const login = document.getElementById("login-usuario").value.trim();
    const senha = document.getElementById("login-senha").value.trim();

    const erro = document.getElementById("login-erro");

    erro.classList.add("hidden");

    const resposta = await fetch(
        `${API}/usuarios?login=${login}&senha=${senha}`
    );

    const usuarios = await resposta.json();

    if (usuarios.length === 0) {
        erro.classList.remove("hidden");
        return;
    }

    const usuario = usuarios[0];

    sessionStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuario)
    );

    window.location.href = "index.html";
}

async function fazerCadastro() {
    const nome = document.getElementById("cadastro-nome").value.trim();
    const email = document.getElementById("cadastro-email").value.trim();
    const login = document.getElementById("cadastro-login").value.trim();
    const senha = document.getElementById("cadastro-senha").value.trim();

    const erro = document.getElementById("cadastro-erro");
    const sucesso = document.getElementById("cadastro-sucesso");

    erro.classList.add("hidden");
    sucesso.classList.add("hidden");

    // Verifica campos obrigatórios
    if (!nome || !email || !login || !senha) {
        erro.textContent = "Preencha todos os campos.";
        erro.classList.remove("hidden");
        return;
    }

    // Validação simples de e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        erro.textContent = "Digite um e-mail válido (ex: usuario@email.com).";
        erro.classList.remove("hidden");
        return;
    }

    // Verifica login já existente
    const checkLogin = await fetch(
        `${API}/usuarios?login=${encodeURIComponent(login)}`
    );

    const usuariosLogin = await checkLogin.json();

    if (usuariosLogin.length > 0) {
        erro.textContent = "Esse login já está em uso.";
        erro.classList.remove("hidden");
        return;
    }

    // Verifica e-mail já existente
    const checkEmail = await fetch(
        `${API}/usuarios?email=${encodeURIComponent(email)}`
    );

    const usuariosEmail = await checkEmail.json();

    if (usuariosEmail.length > 0) {
        erro.textContent = "Esse e-mail já está cadastrado.";
        erro.classList.remove("hidden");
        return;
    }

    const novoUsuario = {
        login,
        senha,
        nome,
        email,
        admin: false
    };

    await fetch(`${API}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
    });

    sucesso.textContent = "Cadastro realizado com sucesso!";
    sucesso.classList.remove("hidden");

    setTimeout(() => {
        sucesso.classList.add("hidden");
        mostrarLogin();
    }, 1500);
}

function logout() {

    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}

function getUsuarioLogado() {

    const dados = sessionStorage.getItem("usuarioLogado");

    return dados
        ? JSON.parse(dados)
        : null;
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("login-usuario").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            fazerLogin();
        }
    });

    document.getElementById("login-senha").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            fazerLogin();
        }
    });

    [
        "cadastro-nome",
        "cadastro-email",
        "cadastro-login",
        "cadastro-senha"
    ].forEach((id) => {
        document.getElementById(id).addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                fazerCadastro();
            }
        });
    });

});