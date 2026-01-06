const estadoAnciaos = {};
const estadoInvestigadores = {};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".anciao").forEach(div => {
  const nome = div.dataset.nome;

  if (!(nome in estadoAnciaos)) {
    estadoAnciaos[nome] = false;
  }

  div.addEventListener("click", () => {
    const derrotado = div.classList.contains("derrotado");

    if (!derrotado) {
      abrirConfirmacao(
        `Derrotar ${nome}?`,
        () => {
          div.classList.add("derrotado");
          estadoAnciaos[nome] = true;
        }
      );
    } else {
      abrirConfirmacao(
        `Reviver ${nome}?`,
        () => {
          div.classList.remove("derrotado");
          estadoAnciaos[nome] = false;
        }
      );
    }
  });
  carregar();
  
  
  const inputAnciao = document.getElementById("anciao");
	const bg = document.getElementById("bg-anciao");
	  
	inputAnciao.addEventListener("input", () => {
	  const nome = inputAnciao.value.trim();

	  if (mapaAnciaos[nome]) {
		bg.style.backgroundImage =
		  `url(assets/anciaos/${mapaAnciaos[nome]})`;

		bg.classList.add("ativo", "animar");
	  } else {
		bg.classList.remove("ativo", "animar");
		bg.style.backgroundImage = "";
	  }
	});

  const selectPressagio = document.getElementById("pressagio");
const imgPressagio = document.getElementById("pressagio-img");
const visual = imgPressagio.parentElement;

const cor = selectPressagio.value;

  imgPressagio.src = `assets/pressagio/${cor}.png`;
	console.log(imgPressagio.src);
  visual.classList.remove("pressagio-ativo");
  void visual.offsetWidth; // força reflow (reinicia animação)
  visual.classList.add("pressagio-ativo");
  visual.className = `pressagio-visual ${cor} pressagio-ativo`;

selectPressagio.addEventListener("change", () => {
  //const cor = selectPressagio.value;
	cora = selectPressagio.value;
  imgPressagio.src = `assets/pressagio/${cora}.png`;
	console.log(imgPressagio.src);
  visual.classList.remove("pressagio-ativo");
  void visual.offsetWidth; // força reflow (reinicia animação)
  visual.classList.add("pressagio-ativo");
  visual.className = `pressagio-visual ${cora} pressagio-ativo`;

});
});

  
 document.querySelectorAll(".investigador-card").forEach(div => {
  const nome = div.dataset.nome;

  if (!(nome in estadoInvestigadores)) {
    estadoInvestigadores[nome] = {
      indisponivel: false,
      causa: null
    };
  }

  div.addEventListener("click", () => {
    const estado = estadoInvestigadores[nome];

    if (!estado.indisponivel) {
      abrirConfirmacao(
        `Marcar ${nome} como indisponível?`,
        () => {
          escolherCausa(causa => {
            div.classList.add("indisponivel");
            aplicarFicha(div, causa);

            estadoInvestigadores[nome] = {
              indisponivel: true,
              causa
            };
          });
        }
      );
    } else {
      abrirConfirmacao(
        `Marcar ${nome} como disponível novamente?`,
        () => {
          div.classList.remove("indisponivel");
          removerFicha(div);

          estadoInvestigadores[nome] = {
            indisponivel: false,
            causa: null
          };
        }
      );
    }
  });
});

});

function escolherCausa(onEscolher) {
  const modal = document.getElementById("modal-escolha");
  modal.classList.remove("hidden");

  document.getElementById("btn-vida").onclick = () => {
    modal.classList.add("hidden");
    onEscolher("vida");
  };

  document.getElementById("btn-sanidade").onclick = () => {
    modal.classList.add("hidden");
    onEscolher("sanidade");
  };
}

function aplicarFicha(div, causa) {
  removerFicha(div);

  const img = document.createElement("img");
  img.className = "ficha-derrota";
  img.src =
    causa === "vida"
      ? "assets/icons/vida.png"
      : "assets/icons/sanidade.png";

  div.appendChild(img);
}

function removerFicha(div) {
  const ficha = div.querySelector(".ficha-derrota");
  if (ficha) ficha.remove();
}


function aplicarAnciaosDerrotados(anciaos) {
  document.querySelectorAll(".anciao").forEach(div => {
    const nome = div.dataset.nome;
    if (anciaos[nome]) {
      div.classList.add("derrotado");
      estadoAnciaos[nome] = true;
    }
  });
}


function aplicarInvestigadoresDerrotados(investigadores) {
  document.querySelectorAll(".investigador-card").forEach(div => {
    const nome = div.dataset.nome;
    const estado = investigadores[nome];

    if (!estado) return;

    // garante estrutura interna
    estadoInvestigadores[nome] = {
      indisponivel: estado.indisponivel,
      causa: estado.causa
    };

    if (estado.indisponivel) {
      div.classList.add("indisponivel");

      if (estado.causa) {
        aplicarFicha(div, estado.causa);
      }
    } else {
      div.classList.remove("indisponivel");
      removerFicha(div);
    }
  });
}

async function criarInvestigadores() {
  const area = document.getElementById("tela_investigadores");
  area.innerHTML = "";

  for (const [nome, pagina] of Object.entries(investigadoresWiki)) {
    const div = document.createElement("div");
    div.className = "investigador";
    div.dataset.nome = nome;
    div.dataset.pagina = pagina;

    const img = document.createElement("img");
    img.src = "assets/x.png"; // provisório
    img.alt = nome;

    const span = document.createElement("span");
    span.textContent = nome;

    div.appendChild(img);
    div.appendChild(span);

    estadoInvestigadores[nome] ??= false;

    div.addEventListener("click", () => {
      div.classList.toggle("derrotado");
      estadoInvestigadores[nome] = div.classList.contains("derrotado");
    });

    area.appendChild(div);

    // 🔽 AQUI acontece a mágica de verdade
    const imagemReal = await buscarImagemInvestigador(pagina);
    if (imagemReal) {
      img.src = imagemReal;
    }
  }
}

async function buscarImagemInvestigador(pagina) {
	console.log("pagina: " + pagina);
  const url =
    "https://eldritchhorror.fandom.com/api.php" +
    "?action=query" +
    "&titles=" + encodeURIComponent(pagina) +
    "&prop=pageimages" +
    "&pithumbsize=500" +
    "&format=json" +
    "&origin=*"; // MUITO IMPORTANTE (CORS)

  const res = await fetch(url);
  const data = await res.json();

  const pages = data.query.pages;
  const page = Object.values(pages)[0];

  return page?.thumbnail?.source || null;
}


const investigadoresWiki = {
  "Agatha Crane": "Agatha_Crane",
  "Agnes Baker": "Agnes_Baker",
  "Akachi Onyele": "Akachi_Onyele",
  "Amanda Sharpe": "Amanda_Sharpe",
  "Ashcan Pete": "Ashcan_Pete",
  "Bob Jenkins": "Bob_Jenkins",
  "Calvin Wright": "Calvin_Wright",
  "Carolyn Fern": "Carolyn_Fern",
  "Carson Sinclair": "Carson_Sinclair",
  "Charlie Kane": "Charlie_Kane",
  "Daisy Walker": "Daisy_Walker",
  "Daniela Reyes": "Daniela_Reyes",
  "Darrell Simmons": "Darrell_Simmons",
  "Dexter Drake": "Dexter_Drake",
  "Diana Stanley": "Diana_Stanley",
  "Father Mateo": "Father_Mateo",
  "Finn Edwards": "Finn_Edwards",
  "George Barnaby": "George_Barnaby",
  "Gloria Goldberg": "Gloria_Goldberg",
  "Hank Samson": "Hank_Samson",
  "Harvey Walters": "Harvey_Walters",
  "Jacqueline Fine": "Jacqueline_Fine",
  "Jenny Barnes": "Jenny_Barnes",
  "Jim Culver": "Jim_Culver",
  "Joe Diamond": "Joe_Diamond",
  "Kate Winthrop": "Kate_Winthrop",
  "Leo Anderson": "Leo_Anderson",
  "Lily Chen": "Lily_Chen",
  "Lola Hayes": "Lola_Hayes",
  "Luke Robinson": "Luke_Robinson",
  "Mandy Thompson": "Mandy_Thompson",
  "Marie Lambeau": "Marie_Lambeau",
  "Mark Harrigan": "Mark_Harrigan",
  "Michael McGlen": "Michael_McGlen",
  "Minh Thi Phan": "Minh_Thi_Phan",
  "Monterey Jack": "Monterey_Jack",
  "Norman Withers": "Norman_Withers",
  "Patrice Hathaway": "Patrice_Hathaway",
  "Preston Fairmont": "Preston_Fairmont",
  "Rex Murphy": "Rex_Murphy",
  "Rita Young": "Rita_Young",
  "Roland Banks": "Roland_Banks",
  "Sefina Rousseau": "Sefina_Rousseau",
  "Silas Marsh": "Silas_Marsh",
  "Sister Mary": "Sister_Mary",
  "Skids O'Toole": "Skids_O'Toole",
  "Tommy Muldoon": "Tommy_Muldoon",
  "Tony Morgan": "Tony_Morgan",
  "Trish Scarborough": "Trish_Scarborough",
  "Ursula Downs": "Ursula_Downs",
  "Vincent Lee": "Vincent_Lee",
  "Wendy Adams": "Wendy_Adams",
  "William Yorick": "William_Yorick",
  "Wilson Richards": "Wilson_Richards",
  "Zoey Samaras": "Zoey_Samaras"
};

const mapaAnciaos = {
  "Abhoth": "Abhoth.webp",
  "Antedilúvio": "Antediluvium.webp",
  "Atlach-Nacha": "Atlach-Nacha.webp",
  "Azathoth": "Azathoth.webp",
  "Cthulhu": "Cthulhu.webp",
  "Hastur": "Hastur.webp",
  "Hypnos": "Hypnos.webp",
  "Ithaqua": "Ithaqua.webp",
  "Nephren-Ka": "Nephren-Ka.webp",
  "Nyarlathotep": "Nyarlathotep.webp",
  "Ascensão das Criaturas Ancestrais": "Elder_Things.webp",
  "Shub-Niggurath": "Shub-Niggurath.webp",
  "Shudde M’ell": "Shudde_Mell.webp",
  "Sizígia": "Syzygy.webp",
  "Yig": "Yig.webp",
  "Yog-Sothoth": "Yog-Sothoth.webp"
};

