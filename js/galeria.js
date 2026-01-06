let indiceImagemAtual = 0;

function carregarImagens(imagens) {
  const carrossel = document.getElementById("carrossel");
  carrossel.innerHTML = "";

  imagens.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => abrirImagem(index);
    carrossel.appendChild(img);
  });
}

function abrirImagem(index) {
  indiceImagemAtual = index;
  document.getElementById("imagemFullscreen").src =
    window.estadoCampanha.imagens[index];

  document.getElementById("overlayImagem").classList.remove("hidden");
}

function proximaImagem() {
  const total = window.estadoCampanha.imagens.length;
  indiceImagemAtual = (indiceImagemAtual + 1) % total;
  abrirImagem(indiceImagemAtual);
}

function imagemAnterior() {
  const total = window.estadoCampanha.imagens.length;
  indiceImagemAtual =
    (indiceImagemAtual - 1 + total) % total;
  abrirImagem(indiceImagemAtual);
}

function excluirImagem() {
  window.estadoCampanha.imagens.splice(indiceImagemAtual, 1);

  localStorage.setItem(
    "eldritch_campanha",
    JSON.stringify(window.estadoCampanha)
  );

  if (window.estadoCampanha.imagens.length === 0) {
    fecharImagem();
    carregarImagens([]);
    return;
  }

  if (indiceImagemAtual >= window.estadoCampanha.imagens.length) {
    indiceImagemAtual = window.estadoCampanha.imagens.length - 1;
  }

  carregarImagens(window.estadoCampanha.imagens);
  abrirImagem(indiceImagemAtual);
}

function fecharImagem() {
  document.getElementById("overlayImagem").classList.add("hidden");
}
