async function montarGraficos() {
    const canvas = document.getElementById("graficoFases");
    if (!canvas) return;

    const [resFilmes, resSeries] = await Promise.all([
        fetch(`${API}/filmes`),
        fetch(`${API}/series`)
    ]);

    const filmes = await resFilmes.json();
    const series = await resSeries.json();

    
    const filmesReais = filmes.filter(f => !f.em_breve);
    const seriesReais = series.filter(s => !s.em_breve);

    const fases = [
        "Fase 1",
        "Fase 2",
        "Fase 3",
        "Fase 4",
        "Fase 5",
        "Fase 6"
    ];

    const filmesPorFase = fases.map(
        fase => filmesReais.filter(f => f.fase === fase).length
    );

    const seriesPorFase = fases.map(
        fase => seriesReais.filter(s => s.fase === fase).length
    );

    new Chart(canvas.getContext("2d"), {
        type: "bar",

        data: {
            labels: fases,

            datasets: [
                {
                    label: "Filmes",
                    data: filmesPorFase,
                    backgroundColor: "#e62429",
                    borderColor: "#b71c1c",
                    borderWidth: 1,
                    borderRadius: 6
                },
                {
                    label: "Séries",
                    data: seriesPorFase,
                    backgroundColor: "#555",
                    borderColor: "#333",
                    borderWidth: 1,
                    borderRadius: 6
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                legend: {
                    labels: {
                        color: "white",
                        font: {
                            size: 14
                        }
                    }
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: "white"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        color: "white",
                        stepSize: 1
                    },

                    grid: {
                        color: "rgba(255,255,255,0.08)"
                    }
                }
            }
        }
    });
}

montarGraficos();