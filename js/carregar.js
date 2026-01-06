function carregar() {
  //Remove botão gerarInvestigadores porque a campanha foi carregada.
  //document.getElementById("btGerarInvestigadores").style.display = "none";
  document.getElementById("btGerarInvestigadores").style.display = "none";
  
  const dados = localStorage.getItem("eldritch_campanha");
  if (!dados) return;

  window.estadoCampanha = JSON.parse(dados);
  const estado = window.estadoCampanha;
  
  if (!window.estadoCampanha.imagens) {
    window.estadoCampanha.imagens = [];
  }
  
  // ===== CAMPANHA =====
  document.getElementById("anciao").value = estado.campanha.ancião;
  document.getElementById("despertou").checked = estado.campanha.despertou;
  document.getElementById("avanco_misterio").value = estado.campanha.avanco_misterio;
  document.getElementById("sessao").value = estado.campanha.sessao_atual;
  document.querySelector(
	  `input[name="misterios"][value="${estado.campanha.misterios_resolvidos}"]`
	).checked = true;

  document.getElementById("doom").value = estado.campanha.doom;
  document.getElementById("pressagio").value = estado.campanha.pressagio;
  document.getElementById("investigadorchefe").value = estado.campanha.investigadorchefe;
   atualizarTextoDataSalva();

  // ===== INVESTIGADORES =====
  const qtd = estado.investigadores.length;
  document.getElementById("qtd_jogadores").value = qtd;

  // gera DOM dos investigadores
  gerarInvestigadores();

  for (let i = 1; i <= qtd; i++) {
    const inv = estado.investigadores[i - 1];

    document.getElementById(`inv_${i}_jogador`).value = inv.jogador;
    document.getElementById(`inv_${i}_nome`).value = inv.nome;

   document.querySelector(
	  `input[name="inv_${i}_força"][value="${inv.atributos.forca}"]`
	).checked = true;

	document.querySelector(
	  `input[name="inv_${i}_conhecimento"][value="${inv.atributos.conhecimento}"]`
	).checked = true;

	document.querySelector(
	  `input[name="inv_${i}_influência"][value="${inv.atributos.influencia}"]`
	).checked = true;

	document.querySelector(
	  `input[name="inv_${i}_observação"][value="${inv.atributos.observacao}"]`
	).checked = true;

	document.querySelector(
	  `input[name="inv_${i}_determinação"][value="${inv.atributos.determinacao}"]`
	).checked = true;

	marcarRadio(`inv_${i}_vida`, inv.vida);
	marcarRadio(`inv_${i}_sanidade`, inv.sanidade);
	marcarRadio(`inv_${i}_concentracao`, inv.concentracao);
	marcarRadio(`inv_${i}_trem`, inv.tickets.trem);
	marcarRadio(`inv_${i}_navio`, inv.tickets.navio);
	marcarRadio(`inv_${i}_pistas`, inv.pistas);

    document.getElementById(`inv_${i}_obs`).value = inv.observacoes;

    // ===== CARTAS =====
    document.getElementById(`inv_${i}_qtd_cartas`).value = inv.cartas.length;

    // gera DOM das cartas
    gerarCartas(i);

    for (let c = 1; c <= inv.cartas.length; c++) {
      const carta = inv.cartas[c - 1];

      document.getElementById(`inv_${i}_carta_${c}_titulo`).value = carta.titulo;
      document.getElementById(`inv_${i}_carta_${c}_tipo`).value = carta.tipo;
      document.getElementById(`inv_${i}_carta_${c}_obs`).value = carta.observacoes;
    }
  }
  
	aplicarAnciaosDerrotados(window.estadoCampanha.anciaosderrotados || {});
	aplicarInvestigadoresDerrotados(window.estadoCampanha.estadoInvestigadores || {});
	carregarEspacos(window.estadoCampanha.espacosdotabuleiro || {});
	//console.log("Campanha carregada:", estado);
	const inputAnciao = document.getElementById("anciao");
	const bg = document.getElementById("bg-anciao");
	const nome = inputAnciao.value.trim();

	  if (mapaAnciaos[nome]) {
		bg.style.backgroundImage =
		  `url(assets/anciaos/${mapaAnciaos[nome]})`;

		bg.classList.add("ativo", "animar");
	  } else {
		bg.classList.remove("ativo", "animar");
		bg.style.backgroundImage = "";
	  }
}

function marcarRadio(nome, valor) {
  const el = document.querySelector(
    `input[name="${nome}"][value="${valor}"]`
  );
  if (el) el.checked = true;
}

function carregarEspacos(espacos = []) {
  const area = document.getElementById("area_tabuleiro");
  area.innerHTML = "";

  espacos.forEach(dados => {
    adicionarEspaco(dados);
  });
}
