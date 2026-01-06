function criarEspaco(index, dados = {}) {
  const div = document.createElement("div");
  div.className = "espaco-tabuleiro";
  div.dataset.index = index;

  div.innerHTML = `
    <h4>Espaço ${index + 1}</h4>

    <div class="grid-campos">
      <div>
        <label>Nome</label>
        <input type="text" class="espaco-nome" value="${dados.nome || ""}"
		list="lista-espacos">
      </div>

      <div>
        <label>Monstros</label>
        <input type="number" class="espaco-monstros" value="${dados.monstros ?? 0}">
      </div>

      <div>
        <label>Fichas</label>
        <input type="text" class="espaco-fichas" value="${dados.fichas || ""}">
      </div>
	
		<div class="despertou-container"  style="align-self: end;">
	  <label class="despertou-toggle">
		<input type="checkbox" class="espaco-portal" ${dados.portal ? "checked" : ""}>
		<span class="despertou-visual">
		  <span class="texto">Portal</span>
		</span>
	  </label>
	</div>
	
	<div class="devastado-container"  style="align-self: end;">
	  <label class="devastado-toggle">
		<input type="checkbox" class="espaco-devastado" ${dados.devastado ? "checked" : ""}>
		<span class="devastado-visual">
		  <span class="texto">Devastado</span>
		</span>
	  </label>
	</div>
		</div>

    <label>Observações</label>
    <input type="text" class="espaco-obs" value="${dados.observacoes || ""}">

    <button type="button" onclick="removerEspaco(this)">
      Remover espaço
    </button>
  `;

  return div;
}

function adicionarEspaco(dados = {}) {
  const area = document.getElementById("area_tabuleiro");
  const index = area.children.length;
  area.appendChild(criarEspaco(index, dados));
}

function removerEspaco(botao) {
  const div = botao.closest(".espaco-tabuleiro");
  div.remove();
  reindexarEspacos();
}

function reindexarEspacos() {
  document.querySelectorAll(".espaco-tabuleiro").forEach((div, i) => {
    div.dataset.index = i;
    div.querySelector("h4").textContent = `Espaço ${i + 1}`;
  });
}
