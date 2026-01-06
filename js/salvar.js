function salvar() {
	 abrirConfirmacao(`Confirma Salvar?`,
        () => {
  // ===== CAMPANHA =====
  window.estadoCampanha = {
    campanha: {
		dataUltimaSalvamento: null,
      ancião: document.getElementById("anciao").value,
      despertou: document.getElementById("despertou").checked,
      avanco_misterio: document.getElementById("avanco_misterio").value,
      sessao_atual: Number(document.getElementById("sessao").value),
      misterios_resolvidos: Number(
        document.querySelector('input[name="misterios"]:checked').value
      ),
      doom: Number(document.getElementById("doom").value),
      pressagio: document.getElementById("pressagio").value,
      investigadorchefe: document.getElementById("investigadorchefe")?.value || ""
    },
    investigadores: []
  };
  
  const agora = new Date().toISOString();

  window.estadoCampanha.dataUltimaSalvamento = agora;

  atualizarTextoDataSalva();

  // ===== INVESTIGADORES =====
  const area = document.getElementById("area_jogadores");
  const investigadoresDOM = area.querySelectorAll(".investigador");

  investigadoresDOM.forEach((div, index) => {

    // IGNORA os marcados para remoção
    if (div.classList.contains("removido")) return;

    const i = index + 1;

    const investigador = {
	  jogador: document.getElementById(`inv_${i}_jogador`).value,
      nome: document.getElementById(`inv_${i}_nome`).value,
      atributos: {
        conhecimento: Number(
          document.querySelector(`input[name="inv_${i}_conhecimento"]:checked`).value
        ),
        influencia: Number(
          document.querySelector(`input[name="inv_${i}_influência"]:checked`).value
        ),
        observacao: Number(
          document.querySelector(`input[name="inv_${i}_observação"]:checked`).value
        ),
        forca: Number(
          document.querySelector(`input[name="inv_${i}_força"]:checked`).value
        ),
        determinacao: Number(
          document.querySelector(`input[name="inv_${i}_determinação"]:checked`).value
        )
      },
		 vida: Number(
		  document.querySelector(`input[name="inv_${i}_vida"]:checked`).value
		),
		sanidade: Number(
		  document.querySelector(`input[name="inv_${i}_sanidade"]:checked`).value
		),
		concentracao: Number(
		  document.querySelector(`input[name="inv_${i}_concentracao"]:checked`).value
		),
		tickets: {
		  trem: Number(
			document.querySelector(`input[name="inv_${i}_Tickets de trem"]:checked`).value
		  ),
		  navio: Number(
			document.querySelector(`input[name="inv_${i}_Tickets de navio"]:checked`).value
		  )
		},
		pistas: Number(
		  document.querySelector(`input[name="inv_${i}_pistas"]:checked`).value
		),
      observacoes: document.getElementById(`inv_${i}_obs`).value,
      cartas: []
    };

    // ===== CARTAS =====
    const cartasDOM = document.querySelectorAll(
      `#cartas_inv_${i} .carta`
    );

    cartasDOM.forEach((_, c) => {
      const idx = c + 1;
      investigador.cartas.push({
        titulo: document.getElementById(`inv_${i}_carta_${idx}_titulo`).value,
        tipo: document.getElementById(`inv_${i}_carta_${idx}_tipo`).value,
        observacoes: document.getElementById(`inv_${i}_carta_${idx}_obs`).value
      });
    });

    // PUSH FINAL — AQUI É O ÚNICO LUGAR
    window.estadoCampanha.investigadores.push(investigador);
  });
  
	window.estadoCampanha.anciaosderrotados = { ...estadoAnciaos };
	
	window.estadoCampanha.estadoInvestigadores = { ...estadoInvestigadores };
	
	console.log("window.estadoCampanha.estadoInvestigadores: ");
	console.log(window.estadoCampanha.estadoInvestigadores);
	
	const espacos = [];

	document.querySelectorAll(".espaco-tabuleiro").forEach(div => {
	  espacos.push({
		nome: div.querySelector(".espaco-nome").value,
		monstros: Number(div.querySelector(".espaco-monstros").value),
		fichas: div.querySelector(".espaco-fichas").value,
		portal: div.querySelector(".espaco-portal").checked,
		devastado: div.querySelector(".espaco-devastado").checked,
		observacoes: div.querySelector(".espaco-obs").value
	  });
	});

	window.estadoCampanha.espacosdotabuleiro = espacos;
	
  localStorage.setItem(
    "eldritch_campanha",
    JSON.stringify(window.estadoCampanha)
  );

  console.log("Campanha salva:", window.estadoCampanha);
  }
      );
	  
}

function apagarSave() {
  abrirConfirmacao(
    "Deseja apagar a campanha?",
    () => {
      // apaga o save
      localStorage.removeItem("eldritch_campanha");

      // recarrega a página (estado 100% limpo)
      location.reload();
    }
  );
}


function formatarData(dataISO) {
  const d = new Date(dataISO);

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }) + " às " +
  d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function atualizarTextoDataSalva() {
  const p = document.getElementById("dataUltima");

  if (!window.estadoCampanha?.dataUltimaSalvamento) {
    p.textContent = "Campanha ainda não foi salva.";
    return;
  }

  p.textContent =
    "Campanha salva em: " +
    formatarData(window.estadoCampanha.dataUltimaSalvamento);
}
