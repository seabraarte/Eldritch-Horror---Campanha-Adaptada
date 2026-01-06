function mostrarTela(tela) {
  const campanha = document.getElementById("tela_campanha");
  const anciaos = document.getElementById("tela_anciaosderrotados");
  const investigadores = document.getElementById("tela_investigadores");

  const abas = document.querySelectorAll(".aba");
  abas.forEach(b => b.classList.remove("ativa"));

  if (tela === "campanha") {
		campanha.style.display = "block";
		anciaos.style.display = "none";
		investigadores.style.display = "none";
		abas[0].classList.add("ativa");
  }
	else if(tela == "investigadores"){
		campanha.style.display = "none";
		investigadores.style.display = "block";
		anciaos.style.display = "none";
		abas[2].classList.add("ativa");
	}
	else if(tela == "anciaos"){
		campanha.style.display = "none";
		investigadores.style.display = "none";
		anciaos.style.display = "block";
		abas[1].classList.add("ativa");
	}
  else {
    campanha.style.display = "none";
    anciaos.style.display = "block";
    abas[2].classList.add("ativa");
  }
}

let acaoConfirmada = null;

function abrirConfirmacao(texto, onConfirmar) {
  const modal = document.getElementById("modal-confirmacao");
  const textoEl = document.getElementById("modal-texto");
  const btnSim = document.getElementById("modal-sim");
  const btnNao = document.getElementById("modal-nao");

  textoEl.textContent = texto;
  modal.classList.remove("hidden");

  acaoConfirmada = () => {
    onConfirmar();
    fecharConfirmacao();
  };

  btnSim.onclick = acaoConfirmada;
  btnNao.onclick = fecharConfirmacao;
}

function fecharConfirmacao() {
  const modal = document.getElementById("modal-confirmacao");
  modal.classList.add("hidden");
  acaoConfirmada = null;
}


