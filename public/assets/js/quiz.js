const perguntasFilmes = [
  { p: "Qual foi o primeiro filme do MCU?", o: ["Thor", "Homem de Ferro", "Os Vingadores", "Capitão América"], r: 1 },
  { p: "Quem criou o Ultron?", o: ["Nick Fury", "Bruce Banner", "Tony Stark", "Thor"], r: 2 },
  { p: "Qual pedra do infinito estava no Tesseract?", o: ["Pedra da Mente", "Pedra do Espaço", "Pedra do Tempo", "Pedra da Realidade"], r: 1 },
  { p: "Em qual planeta Thanos sacrificou Gamora?", o: ["Knowhere", "Vormir", "Titan", "Sakaar"], r: 1 },
  { p: "Quem diz 'I am Iron Man' no final de Ultimato?", o: ["Nick Fury", "Capitão América", "Tony Stark", "Thor"], r: 2 },
  { p: "Quem forjou o Stormbreaker?", o: ["Odin", "Eitri", "Thor", "Rocket"], r: 1 },
  { p: "Qual é o nome real do Capitão América?", o: ["James Rogers", "Steve Rogers", "Sam Wilson", "Bucky Barnes"], r: 1 },
  { p: "Qual é o país fictício onde vive a Pantera Negra?", o: ["Madripoor", "Sokovia", "Wakanda", "Kamar-Taj"], r: 2 },
  { p: "Quem é o vilão do primeiro Homem de Ferro?", o: ["Whiplash", "Mandarim", "Obadiah Stane", "Justin Hammer"], r: 2 },
  { p: "Qual é o nome da IA assistente original de Tony Stark?", o: ["FRIDAY", "JARVIS", "HOMER", "EDITH"], r: 1 },
  { p: "Quem é o pai biológico de Peter Quill (Star-Lord)?", o: ["Thanos", "Ronan", "Ego", "Yondu"], r: 2 },
  { p: "O que alimenta a armadura do Homem de Ferro?", o: ["Vibranium", "Energia solar", "Reator Arc", "Joia do Infinito"], r: 2 },
  { p: "Por que Thor foi banido para a Terra no primeiro filme?", o: ["Por matar um Frost Giant", "Por agir com arrogância e desobedecer Odin", "Por roubar Mjolnir", "Por trair Asgard"], r: 1 },
  { p: "Quem é o verdadeiro pai de Loki?", o: ["Odin", "Laufey", "Bor", "Surtur"], r: 1 },
  { p: "Qual personagem usa o codinome 'Ronin' em Ultimato?", o: ["Viúva Negra", "Capitão América", "Gavião Arqueiro", "Falcão"], r: 2 },
  { p: "Qual Joia do Infinito os Guardiões encontram no primeiro filme?", o: ["Pedra da Mente", "Pedra do Poder", "Pedra do Espaço", "Pedra da Realidade"], r: 1 },
  { p: "O que Groot faz no final do primeiro Guardiões para salvar o grupo?", o: ["Usa a Joia", "Envolve todos com seu corpo para protegê-los", "Luta contra Ronan", "Foge com a nave"], r: 1 },
  { p: "Quem entregou a Joia do Tempo para Thanos em Guerra Infinita?", o: ["Gamora", "Nebula", "Doutor Estranho", "Tony Stark"], r: 2 },
  { p: "Em qual filme o Homem-Aranha aparece pela primeira vez no MCU?", o: ["De Volta ao Lar", "Guerra Civil", "Ultimato", "Guerra Infinita"], r: 1 },
  { p: "Qual é o nome da deusa da morte em Thor: Ragnarok?", o: ["Valquíria", "Sif", "Hela", "Frigga"], r: 2 },
  { p: "Quem assume o escudo do Capitão América após Steve Rogers?", o: ["Bucky Barnes", "Tony Stark", "Sam Wilson", "Clint Barton"], r: 2 },
  { p: "Qual vilão é o antagonista de Pantera Negra: Wakanda Para Sempre?", o: ["Killmonger", "Klaw", "Namor", "M'Baku"], r: 2 },
  { p: "Qual é o nome do reino submarino em Wakanda Para Sempre?", o: ["Atlantis", "Talokan", "Lemuria", "Xebel"], r: 1 },
  { p: "Quem é Kang, o Conquistador em Quantumania?", o: ["Um Skrull", "Um viajante do tempo", "Um clone de Tony Stark", "Um Eterno"], r: 1 },
  { p: "Qual classificação tem Deadpool & Wolverine?", o: ["12 anos", "14 anos", "16 anos", "18 anos"], r: 3 }
];




const perguntasSeries = [
  { p: "Em WandaVision, qual cidade Wanda controla com sua magia?", o: ["Sokovia", "Westview", "Madripoor", "Stamford"], r: 1 },
  { p: "Qual é o nome da vilã revelada em WandaVision?", o: ["Monica Rambeau", "Agatha Harkness", "Titania", "Sharon Carter"], r: 1 },
  { p: "Quantos episódios tem a primeira temporada de Loki?", o: ["4", "6", "8", "9"], r: 1 },
  { p: "Quem é Sylvie em Loki?", o: ["Uma agente da AVT", "Uma variante feminina de Loki", "A filha de Thanos", "Uma Valquíria"], r: 1 },
  { p: "Em Falcão e o Soldado Invernal, quem assume o escudo após Sam recusar?", o: ["Bucky Barnes", "John Walker (US Agent)", "Zemo", "Sharon Carter"], r: 1 },
  { p: "Qual deus egípcio Marc Spector serve em Moon Knight?", o: ["Anúbis", "Rá", "Khonshu", "Osíris"], r: 2 },
  { p: "Qual é a duração de Gavião Arqueiro?", o: ["4 episódios", "6 episódios", "8 episódios", "10 episódios"], r: 1 },
  { p: "Quem é Kate Bishop em Gavião Arqueiro?", o: ["Sobrinha de Clint Barton", "Nova arqueira que admira Gavião Arqueiro", "Agente da SHIELD", "Filha do Kingpin"], r: 1 },
  { p: "Em Ms. Marvel, o que desperta os poderes de Kamala Khan?", o: ["Uma picada de aranha", "Uma pulseira ancestral", "Um soro experimental", "Radiação gama"], r: 1 },
  { p: "Qual vilão retorna na série Demolidor: Renascido?", o: ["Bullseye", "Elektra", "Kingpin", "Punisher"], r: 2 },
  { p: "Em She-Hulk, como Jennifer Walters ganha seus poderes?", o: ["Experimento científico", "Transfusão de sangue acidental com Bruce Banner", "Joia do Infinito", "Fórmula super-soldado"], r: 1 },
  { p: "Quantas temporadas tem Loki?", o: ["1", "2", "3", "4"], r: 1 },
  { p: "Em Invasão Secreta, quem são os invasores secretos?", o: ["Kree", "Chitauri", "Skrulls renegados", "Symbiotes"], r: 2 },
  { p: "Em Agatha All Along, o que é a Estrada das Bruxas?", o: ["Um feitiço de proteção", "Uma jornada mágica onde cada etapa pode custar uma vida", "O nome da missão da AVT", "Uma dimensão alternativa"], r: 1 },
  { p: "Qual série estreou primeiro no Disney+?", o: ["Falcão e o Soldado Invernal", "Loki", "WandaVision", "Gavião Arqueiro"], r: 2 },
  { p: "Em Moon Knight, Marc Spector tem quantas personalidades principais?", o: ["1", "2", "3", "4"], r: 2 },
  { p: "Qual é a classificação de Demolidor: Renascido?", o: ["12 anos", "14 anos", "16 anos", "18 anos"], r: 2 },
  { p: "Em Visão, o que diferencia essa versão do personagem?", o: ["Tem memórias de Wanda", "É uma IA pura sem memórias do passado", "É um clone de vibranium", "Trabalha para a AVT"], r: 1 },
  { p: "Quem é Billy Maximoff em Agatha All Along?", o: ["Filho de Agatha", "Filho de Wanda e Visão", "Um aprendiz de feiticeiro", "Um agente da AVT"], r: 1 },
  { p: "Em qual fase do MCU se passa a série Invasão Secreta?", o: ["Fase 3", "Fase 4", "Fase 5", "Fase 6"], r: 2 }
];



const perguntasPersonalidade = [
  {
    p: "Diante de uma ameaça, você:",
    o: ["Age imediatamente, sem pensar muito", "Planeja tudo com calma antes de agir", "Tenta resolver no diálogo", "Busca aliados para agir junto"],
    peso: ["acao", "estrategia", "diplomacia", "equipe"]
  },
  {
    p: "Seu maior ponto forte é:",
    o: ["Inteligência e tecnologia", "Força e coragem", "Empatia e liderança", "Astúcia e criatividade"],
    peso: ["tech", "forca", "lideranca", "astuta"]
  },
  {
    p: "O que mais importa para você?",
    o: ["Proteger as pessoas que amo", "Fazer o que é certo, custe o que custar", "Provar meu valor para o mundo", "Liberdade acima de tudo"],
    peso: ["protecao", "justo", "ambicao", "liberdade"]
  },
  {
    p: "Como você lida com seus erros?",
    o: ["Assumo e tento consertar", "Fico remoendo por muito tempo", "Culpo as circunstâncias", "Aprendo e sigo em frente rapidamente"],
    peso: ["responsavel", "culpa", "negacao", "resiliencia"]
  },
  {
    p: "Qual ambiente você prefere?",
    o: ["Laboratório / cidade moderna", "Campo de batalha / ao ar livre", "Entre as estrelas / aventura", "Qualquer lugar, desde que com meus amigos"],
    peso: ["tech", "acao", "aventura", "equipe"]
  },
  {
    p: "Como você se relaciona com as regras?",
    o: ["Sigo as regras, elas existem por uma razão", "Quebro as regras quando a situação exige", "Faço minhas próprias regras", "Finjo seguir, mas faço o que quero"],
    peso: ["justo", "rebelde", "lider", "astuta"]
  },
  {
    p: "Qual superpoder você escolheria?",
    o: ["Armadura tecnológica avançada", "Super força e resistência", "Magia e feitiçaria", "Habilidade de encolher e crescer"],
    peso: ["tech", "forca", "magia", "adaptacao"]
  },
  {
    p: "Nas horas vagas, você:",
    o: ["Inventa e constrói coisas", "Treina e se prepara", "Estuda e lê muito", "Curte música e se diverte"],
    peso: ["tech", "forca", "estrategia", "aventura"]
  }
];

const personagens = [
  {
    nome: "Homem de Ferro",
    emoji: "🤖",
    descricao: "Você é brilhante, confiante e resolve problemas com tecnologia e ousadia. Às vezes arrogante, mas no fundo seu coração é enorme.",
    pesos: ["tech", "acao", "ambicao", "resiliencia"],
    cor: "#c0392b"
  },
  {
    nome: "Capitão América",
    emoji: "🛡️",
    descricao: "Você tem uma bússola moral inabalável. Faz o que é certo mesmo quando é difícil, e inspira todos ao redor.",
    pesos: ["justo", "lideranca", "responsavel", "forca"],
    cor: "#2980b9"
  },
  {
    nome: "Viúva Negra",
    emoji: "🕷️",
    descricao: "Você é astuto, adaptável e resolve situações difíceis com inteligência. Carrega um passado complexo, mas usa isso como força.",
    pesos: ["astuta", "estrategia", "rebelde", "protecao"],
    cor: "#27ae60"
  },
  {
    nome: "Thor",
    emoji: "⚡",
    descricao: "Você é poderoso, leal e tem um coração de ouro — mesmo quando exagera na confiança. Cresce com cada desafio.",
    pesos: ["forca", "equipe", "liberdade", "resiliencia"],
    cor: "#8e44ad"
  },
  {
    nome: "Homem-Aranha",
    emoji: "🕸️",
    descricao: "Você equilibra responsabilidade com leveza. Enfrenta desafios enormes sem perder o senso de humor e o coração.",
    pesos: ["responsavel", "equipe", "adaptacao", "protecao"],
    cor: "#e74c3c"
  },
  {
    nome: "Peter Quill",
    emoji: "🚀",
    descricao: "Você é espontâneo, divertido e vive pela emoção do momento. Ama aventuras e tem um talento natural para liderar o caos.",
    pesos: ["aventura", "liberdade", "astuta", "equipe"],
    cor: "#e67e22"
  },
  {
    nome: "Wanda Maximoff",
    emoji: "🔮",
    descricao: "Você tem um poder imenso que vem das emoções. É intensamente leal a quem ama e capaz de transformar o mundo ao seu redor.",
    pesos: ["magia", "protecao", "culpa", "ambicao"],
    cor: "#c0392b"
  },
  {
    nome: "Loki",
    emoji: "🐍",
    descricao: "Você é inteligente, imprevisível e sempre tem um plano. Pode parecer egoísta, mas no fundo quer pertencer a algo maior.",
    pesos: ["astuta", "negacao", "ambicao", "magia"],
    cor: "#16a085"
  }
];



let perguntasAtuais = [];
let indicePergunta = 0;
let pontuacao = 0;
let modoAtual = "";
let pesosPersonalidade = {};

function mostrarElemento(id) {
  document.getElementById(id).classList.remove("hidden");
}

function esconderElemento(id) {
  document.getElementById(id).classList.add("hidden");
}

function iniciarQuizFilmes() {
  modoAtual = "filmes";
  perguntasAtuais = embaralhar([...perguntasFilmes]).slice(0, 10);
  iniciarQuiz();
}

function iniciarQuizSeries() {
  modoAtual = "series";
  perguntasAtuais = embaralhar([...perguntasSeries]).slice(0, 10);
  iniciarQuiz();
}

function iniciarQuizPersonalidade() {
  modoAtual = "personalidade";
  pesosPersonalidade = {};
  perguntasAtuais = [...perguntasPersonalidade];
  iniciarQuiz();
}

function embaralhar(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function iniciarQuiz() {
  indicePergunta = 0;
  pontuacao = 0;

  esconderElemento("tela-inicial");
  mostrarElemento("tela-quiz");
  esconderElemento("tela-resultado");
  esconderElemento("tela-personalidade");

  const labelTema = {
    filmes: "🎬 Quiz de Filmes",
    series: "📺 Quiz de Séries",
    personalidade: "🦸 Qual herói você seria?"
  };

  document.getElementById("tema-ativo").textContent = labelTema[modoAtual];

  atualizarProgresso();
  mostrarPergunta();
}

function mostrarPergunta() {
  const q = perguntasAtuais[indicePergunta];
  const total = perguntasAtuais.length;

  document.getElementById("numero-pergunta").textContent =
    `Pergunta ${indicePergunta + 1} de ${total}`;

  document.getElementById("texto-pergunta").textContent = q.p;

  atualizarProgresso();

  const opcoesList = document.getElementById("opcoes");
  opcoesList.innerHTML = "";

  q.o.forEach((opcao, i) => {
    opcoesList.innerHTML += `
      <button class="opcao-btn w-100 text-start mb-2"
              onclick="responder(${i})">
        <span class="letra-opcao">
          ${String.fromCharCode(65 + i)}
        </span>
        ${opcao}
      </button>
    `;
  });

  esconderElemento("feedback");
  esconderElemento("btn-proxima");
}

function atualizarProgresso() {
  const pct = (indicePergunta / perguntasAtuais.length) * 100;
  document.getElementById("barra-progresso").style.width = pct + "%";
}

function responder(indiceEscolhido) {

  const q = perguntasAtuais[indicePergunta];

  const botoes = document.querySelectorAll(".opcao-btn");

  botoes.forEach(b => b.disabled = true);

  if (modoAtual === "personalidade") {

    const peso = q.peso[indiceEscolhido];

    pesosPersonalidade[peso] =
      (pesosPersonalidade[peso] || 0) + 1;

    botoes[indiceEscolhido].classList.add("selecionada");

    esconderElemento("feedback");

  } else {

    const feedback = document.getElementById("feedback");

    mostrarElemento("feedback");

    if (indiceEscolhido === q.r) {

      pontuacao++;

      botoes[indiceEscolhido].classList.add("correta");

      feedback.className =
        "feedback-box feedback-certo";

      feedback.textContent = "Correto!";

    } else {

      botoes[indiceEscolhido].classList.add("errada");

      botoes[q.r].classList.add("correta");

      feedback.className =
        "feedback-box feedback-errado";

      feedback.textContent =
        `Errado! A resposta correta era: ${q.o[q.r]}`;

    }

  }

  mostrarElemento("btn-proxima");
}

function proximaPergunta() {

  indicePergunta++;

  if (indicePergunta < perguntasAtuais.length) {

    mostrarPergunta();

  } else {

    document.getElementById("barra-progresso").style.width = "100%";

    if (modoAtual === "personalidade") {

      mostrarResultadoPersonalidade();

    } else {

      mostrarResultado();

    }

  }

}

function mostrarResultado() {

  esconderElemento("tela-quiz");
  mostrarElemento("tela-resultado");

  const total = perguntasAtuais.length;

  const pct = Math.round(
    (pontuacao / total) * 100
  );

  document.getElementById("pontuacao-final").textContent =
    `${pontuacao} / ${total}`;

  document.getElementById("percentual-final").textContent =
    `${pct}%`;

  let msg = "";
  let cls = "";

  if (pct === 100) {
    msg = "Perfeito! Você é um expert do MCU!";
    cls = "cor-ouro";
  } else if (pct >= 80) {
    msg = "Incrível! Você conhece muito bem o MCU!";
    cls = "cor-verde";
  } else if (pct >= 60) {
    msg = "Muito bem! Continue assistindo!";
    cls = "cor-azul";
  } else if (pct >= 40) {
    msg = "Bom esforço! Tem muito mais para aprender!";
    cls = "cor-amarelo";
  } else {
    msg = "Hora de rever o MCU do começo!";
    cls = "cor-vermelho";
  }

  const msgEl = document.getElementById("mensagem-resultado");

  msgEl.textContent = msg;
  msgEl.className = cls + " fw-bold fs-5 mt-2 mb-4";

  document.getElementById("btn-jogar-novamente").onclick =
    modoAtual === "filmes"
      ? iniciarQuizFilmes
      : iniciarQuizSeries;
}

function mostrarResultadoPersonalidade() {

  esconderElemento("tela-quiz");
  mostrarElemento("tela-personalidade");

  let melhorPersonagem = null;
  let melhorPontos = -1;

  personagens.forEach(p => {

    let pts = 0;

    p.pesos.forEach(peso => {
      pts += (pesosPersonalidade[peso] || 0);
    });

    if (pts > melhorPontos) {
      melhorPontos = pts;
      melhorPersonagem = p;
    }

  });

  document.getElementById("personagem-emoji").textContent =
    melhorPersonagem.emoji;

  document.getElementById("personagem-nome").textContent =
    melhorPersonagem.nome;

  document.getElementById("personagem-descricao").textContent =
    melhorPersonagem.descricao;
}

function voltarInicio() {

  mostrarElemento("tela-inicial");
  esconderElemento("tela-quiz");
  esconderElemento("tela-resultado");
  esconderElemento("tela-personalidade");

  document.getElementById("barra-progresso").style.width = "0%";
}