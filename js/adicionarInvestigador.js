function adicionarInvestigador() {
  const area = document.getElementById("area_jogadores");

  // quantidade atual baseada no DOM
  const qtdAtual = area.querySelectorAll(".investigador").length;
  const i = qtdAtual + 1;

  const div = document.createElement("div");
  div.className = "investigador";
	div.id = `investigador_${i}`;
	
  div.innerHTML = `
    <h3>Investigador ${i}</h3>

   <div class="grid-campos">
		<div>
      <label>Jogador:</label>
      <input type="text" id="inv_${i}_jogador">
	  </div>
	  
	 <div>
	  <label>Investigador:</label>
	  <input
		type="text"
		id="inv_${i}_nome"
		list="lista-investigadores"
	  >
	</div>

	
		</div>

    <hr>
	<div class="grid-campos">
    ${campoEscala(i, "conhecimento")}
    ${campoEscala(i, "influência")}
    ${campoEscala(i, "observação")}
    ${campoEscala(i, "força")}
    ${campoEscala(i, "determinação")}
	</div>
    <hr>

    <div class="grid-campos">
	  ${campoNumerico(i, "vida", 1, 9, 5)}
	  ${campoNumerico(i, "sanidade", 1, 9, 5)}
	  ${campoNumerico(i, "concentracao", 0, 2, 0)}
	  ${campoNumerico(i, "Tickets de trem", 0, 2, 0)}
	  ${campoNumerico(i, "Tickets de navio", 0, 2, 0)}
	  ${campoNumerico(i, "pistas", 0, 9, 0)}
	</div>

    <label>Observações:</label>
    <input type="text" id="inv_${i}_obs">

    <hr>

    <div class="grid-campos">
      <div>
        <label>Qtd de cartas</label>
        <input type="number" id="inv_${i}_qtd_cartas" value="0" min="0">
      </div>
      <div>
        <button onclick="adicionarCarta(${i})">Adicionar Cartas</button>
      </div>
    </div>

    <div id="cartas_inv_${i}"></div>
	
	<button type="button" onclick="alternarRemocao(${i})">
	  Remover jogador
	</button>

  `;

  area.appendChild(div);

  // opcional: atualizar campo "qtd_jogadores", se existir
  const campoQtd = document.getElementById("qtd_jogadores");
  if (campoQtd) campoQtd.value = i;
}

function adicionarCarta(i) {
  const area = document.getElementById(`cartas_inv_${i}`);

  // conta quantas cartas já existem
  const cartasExistentes = area.querySelectorAll(".carta").length;
  const c = cartasExistentes + 1;

  const div = document.createElement("div");
  div.className = "carta";
  div.dataset.index = c;
  //<input type="number" id="inv_${i}_qtd_cartas" value="0" min="0">
  const qtdCartas = document.getElementById(`inv_${i}_qtd_cartas`);
  qtdCartas.value = c;
  
  div.innerHTML = `
    <h4>Carta ${c}</h4>

    <div class="grid-campos">
      <div>
        <label>Título</label>
        <input type="text" id="inv_${i}_carta_${c}_titulo">
      </div>

      <div>
        <label>Tipo</label>
        <input type="text" id="inv_${i}_carta_${c}_tipo">
      </div>
    </div>

    <label>Observações</label>
    <input type="text" id="inv_${i}_carta_${c}_obs">

    <button type="button" onclick="excluirCarta(${i}, ${c})">
      Excluir
    </button>
  `;

  area.appendChild(div);
}


function alternarRemocao(i) {
  const inv = document.getElementById(`investigador_${i}`);
  inv.classList.toggle("removido");
}

function campoNumerico(i, nome, min, max, padrao = 0) {
  const label =
    nome.charAt(0).toUpperCase() + nome.slice(1);

  const valores = [];
  for (let v = min; v <= max; v++) valores.push(v);

  return `
    <div class="escala">
      <span class="escala-label">${label}</span>
      <div class="escala-opcoes">
        ${valores
          .map(
            v => `
          <label class="escala-item">
            <input type="radio"
                   name="inv_${i}_${nome}"
                   value="${v}"
                   ${v === padrao ? "checked" : ""}>
            <span>${v}</span>
          </label>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}
