const tooltip = document.getElementById("tooltip");
const mapaContainer = document.getElementById("mapaPeru");

const poblacion = {
  amazonas: 426806,
  ancash: 1180638,
  apurimac: 430736,
  arequipa: 1498470,
  ayacucho: 668213,
  cajamarca: 1453711,
  callao: 1129854,
  cusco: 1357073,
  huancavelica: 365317,
  huanuco: 760267,
  ica: 975182,
  junin: 1361467,
  la_libertad: 2016771,
  lambayeque: 1266518,
  lima: 10192715,
  loreto: 1027559,
  madre_de_dios: 173811,
  moquegua: 192740,
  pasco: 336246,
  piura: 2047954,
  puno: 1238012,
  san_martin: 899648,
  tacna: 370974,
  tumbes: 251521,
  ucayali: 589110
};

async function cargarMapa() {
  const res = await fetch("svg/peru.svg");
  const textoSVG = await res.text();

  mapaContainer.innerHTML = textoSVG;

  activarEventos();
}

function activarEventos() {
  const regiones = document.querySelectorAll("#mapaPeru svg path");

  regiones.forEach(region => {
    region.addEventListener("mousemove", e => {
      const id = region.id;
      const nombre = id.replace(/_/g, " ").toUpperCase();
      const habitantes = poblacion[id] ? poblacion[id].toLocaleString() : "Sin datos";

      tooltip.innerHTML = `<strong>${nombre}</strong><br>${habitantes} habitantes`;
      tooltip.style.left = e.pageX + 10 + "px";
      tooltip.style.top = e.pageY + 10 + "px";
      tooltip.style.display = "block";

      regiones.forEach(r => r.classList.remove("resaltado"));
      region.classList.add("resaltado");
    });

    region.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
      region.classList.remove("resaltado");
    });
  });
}

cargarMapa();
