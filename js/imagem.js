function lerImagens(callback) {
  const input = document.getElementById("imagens");
  const arquivos = input.files;

  if (!arquivos || arquivos.length === 0) {
    callback([]);
    return;
  }

  const imagensBase64 = [];
  let carregadas = 0;

  Array.from(arquivos).forEach(arquivo => {
    const reader = new FileReader();

    reader.onload = e => {
      imagensBase64.push(e.target.result);
      carregadas++;

      if (carregadas === arquivos.length) {
        callback(imagensBase64);
      }
    };

    reader.readAsDataURL(arquivo);
  });
}


function carregarImagens(imagens) {
  const carrossel = document.getElementById("carrossel");
  carrossel.innerHTML = "";

  imagens.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    carrossel.appendChild(img);
  });
}
