// map
const map = L.map("mapid").setView([2.8247286,-60.6791095], 15);

// tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// icon
const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // option to add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// add photos field
function addPhotoField() {
  //pegar container de fotos
  const container = document.querySelector("#images");

  // pegar o container para duplicar .new-image
  const fieldsContainer = document.querySelectorAll(".new-upload");

  // realizar o clone da ultima imagem adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  // verificar se o cmpo esta vazio, se sim, nao adicionar ao container de imagens
  const input = newFieldContainer.children[0];

  if (input.value == "") {
    return;
  }

  // limpa o campo antes de adicionar  ao container de images-
  input.value = "";

  // adicionar clone ao container #images
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;
  const fieldsContainer = document.querySelectorAll(".new-upload");
  if (fieldsContainer.length <= 1) {
    //limpar valor do campo
    span.parentNode.children[0].value = "";
    return;
  }

  // deletar o campo
  span.parentNode.remove();
}

// select yes or no
function toggleSelect(event) {
  //retira a class .active dos botoes
  document.querySelectorAll('.button-select button')
  .forEach(function (button) {
    button.classList.remove("active")
  })

  // coloca a classe.active nesse botao clicando
  const button = event.currentTarget
  button.classList.add("active")

  // pega botao clicado
  const input = document.querySelector('[name="open_on_weekends"]')

  // checa sim ou nao 
  input.value = button.dataset.value
}
