function gerarInvestigadores() {
  const qtd = Number(document.getElementById("qtd_jogadores").value);
  const area = document.getElementById("area_jogadores");

  area.innerHTML = "";

  for (let i = 1; i <= qtd; i++) {
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
        <input type="number" id="inv_${i}_qtd_cartas" value="0" min="0" disabled>
      </div>
      <div>
       <button id="btAdicionarCarta" type="button" onclick="adicionarCarta(${i})">
		  Adicionar Carta
		</button>
      </div>
    </div>

    <div id="cartas_inv_${i}"></div>
	
	
	<button type="button" onclick="alternarRemocao(${i})">
	  Remover jogador
	</button>
    `;

    area.appendChild(div);
  }
}


function campoEscala(i, nome) {
  const label = nome.charAt(0).toUpperCase() + nome.slice(1);

  return `
	
	<div>
    <div class="escala">
      <span class="escala-label">${label} alterado:</span>
      <div class="escala-opcoes">
        ${[-2, -1, 0, 1, 2].map(v => `
          <label class="escala-item">
            <input type="radio" 
                   name="inv_${i}_${nome}" 
                   value="${v}" 
                   ${v === 0 ? "checked" : ""}>
            <span>${v > 0 ? "+" + v : v}</span>
          </label>
        `).join("")}
      </div>
    </div>
	</div>
	
  `;
}


function gerarCartas(i) {
  const qtd = Number(document.getElementById(`inv_${i}_qtd_cartas`).value);
  const area = document.getElementById(`cartas_inv_${i}`);

  area.innerHTML = "";

  for (let c = 1; c <= qtd; c++) {
    const div = document.createElement("div");
    div.className = "carta";
    div.dataset.index = c;

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
}

function adicionarCarta(i) {
  const area = document.getElementById(`cartas_inv_${i}`);
  const qtdAtual = area.querySelectorAll(".carta").length;
  const c = qtdAtual + 1;

  const div = document.createElement("div");
  div.className = "carta";
  div.dataset.index = c;

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

  // sincroniza o contador
  document.getElementById(`inv_${i}_qtd_cartas`).value = c;
}


function excluirCarta(i, indice) {
  const area = document.getElementById(`cartas_inv_${i}`);
  const cartas = Array.from(area.querySelectorAll(".carta"));

  // remove a carta escolhida
  cartas[indice - 1].remove();

  // reindexa tudo que sobrou
  const cartasRestantes = Array.from(area.querySelectorAll(".carta"));

  cartasRestantes.forEach((cartaDiv, novoIndex) => {
    const c = novoIndex + 1;

    cartaDiv.dataset.index = c;
    cartaDiv.querySelector("h4").textContent = `Carta ${c}`;

    cartaDiv.querySelector(
      `input[id^="inv_${i}_carta_"][id$="_titulo"]`
    ).id = `inv_${i}_carta_${c}_titulo`;

    cartaDiv.querySelector(
      `input[id^="inv_${i}_carta_"][id$="_tipo"]`
    ).id = `inv_${i}_carta_${c}_tipo`;

    cartaDiv.querySelector(
      `input[id^="inv_${i}_carta_"][id$="_obs"]`
    ).id = `inv_${i}_carta_${c}_obs`;

    cartaDiv.querySelector("button").onclick = () =>
      excluirCarta(i, c);
  });

  // atualiza campo "qtd de cartas"
  document.getElementById(`inv_${i}_qtd_cartas`).value =
    cartasRestantes.length;
}

