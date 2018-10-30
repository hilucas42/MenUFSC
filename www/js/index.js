var str = {
    "13082018": [
      "Arroz branco \nArroz integral \nFeijão vermelho \nLentilha ",
      "Carne moída c/ \nmilho ",
      "Frango assado ",
      "Purê de batatas ",
      "Farofa ",
      "Saladas ",
      "Grão ",
      "Sobremesas "
    ],
    "14082018": [
      "Arroz branco \nArroz integral \nFeijão preto \nLentilha ",
      "Bisteca suína ao \nmolho barbecue ",
      "Iscas à portuguesa ",
      "Espaguete ao alho e \nóleo ",
      "Farofa ",
      "Saladas ",
      "Grão ",
      "Sobremesas "
    ],
    "15082018": [
      "Arroz branco \nArroz integral \nFeijão carioca \nLentilha ",
      "Strogonoff de \nfrango ",
      "Cupim assado ",
      "Batata palha ",
      "Farofa ",
      "Saladas ",
      "Grão ",
      "Sobremesas "
    ],
    "16082018": [
      "Arroz branco \nArroz integral \nFeijão preto \nLentilha ",
      "Cubos de carne ao \nsugo ",
      "Frango grelhado ",
      "Cenoura sauté ",
      "Farofa ",
      "Saladas ",
      "Grão ",
      "Sobremesas "
    ],
    "17082018": [
      "Arroz branco \nArroz integral \nFeijão preto \nLentilha ",
      "Lagarto recheado ",
      "Peixe crocante ",
      "Batata doce \nassada ",
      "Farofa ",
      "Saladas ",
      "Grão ",
      "Sobremesas "
    ],
    "18082018": [
      "Arroz branco \nArroz integral \nFeijão carioca \nLentilha ",
      "Escondidinho de \ncarne ",
      "Sobrecoxa ao \nmolho ",
      "Macarrão \nprimavera ",
      "Farofa ",
      "Saladas ",
      "Grão ",
      "Sobremesas "
    ],
    "19082018": [
      "Arroz branco \nArroz integral \nFeijão vermelho \nLentilha ",
      "Fraldinha/linguiça ",
      "Fricassê ",
      "Legumes \nrefogados ",
      "Farofa ",
      "Saladas ",
      "Grão ",
      "Sobremesas "
    ]
  };


var app = new Framework7({
    root: '#app' // App root element

});

var swiper = app.swiper.create('.swiper-container', {
    speed: 400,
    spaceBetween: 100
});


function createSlide(data, cardapio) {
  let str = '';
  let date = data.slice(0,2) +'/'+ data.slice(2,4) +'/'+ data.slice(4,9);

  let dias_semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  let dia_atual = dias_semana[new Date(data.slice(4,9), data.slice(2,4), data.slice(0,2), 0,0,0,0).getDay()];


  str += '<div class="swiper-slide">';
  str += '<div id="lunch_date1" class="tab tab-active">';
  str += '<br><center><b>'+dia_atual+' - '+date+'</b></center>';
  str += '<ul>';
  for(var i in cardapio) {
    str += '<li><div class="item-content">'+cardapio[i]+'</div></li>';
  }
  str += '</ul>';
  str += '</div> </div> </div>';

  return str;
}


for(var i in str) {
  swiper.appendSlide([createSlide(i, str[i])]);
}