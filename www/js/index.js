var app = new Framework7({
    root: '#app', // App root element

    data: {
        swiper: {}
    },

    methods: {
        initialize: function() {
            this.data.swiper = app.swiper.create('.swiper-container', {
                speed: 400,
                spaceBetween: 100
            });

            var menuData = client.getMenu();
            for (let i in menuData) {
                this.data.swiper.appendSlide([this.methods.createSlide(i, menuData[i])]);
            };
        },
        updateSwiper: function() {
            // Refresh the swiper content, taking care to stay showing
            // the slide user was seeing
        },

        // Functions intended to use "privately", only by the "app" module
        createSlide: function(data, cardapio) {
            let str = '';
            let date = data.slice(0, 2) + '/' + data.slice(2, 4) + '/' + data.slice(4, 9);
        
            let dias_semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'QUINTA-FEIRA', 'Sexta-feira', 'Sábado'];
        
            let dia_atual = dias_semana[new Date(data.slice(4, 9), data.slice(2, 4), data.slice(0, 2), 0, 0, 0, 0).getDay()];
        
        
            str += '<div class="swiper-slide">';
            str += '<div id="lunch_date1" class="tab tab-active card">';
            str += '<div class="card-header"><h3>' + dia_atual + '</h3><p>' + date + '</p></div>';
            str += '<div class="card-content card-content-padding list simple-list"><ul>';
            for (var i in cardapio) {
                str += '<li class="item-content">' + cardapio[i] + '</li>';
            }
            str += '</ul></div>';
            str += '</div></div></div>';
        
            return str;
        }
    }
});

var client = (() => {

    var dummyData = {
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
            "Grão "
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

    return {
        initialize: function() {
            // Refresh the cached menu
            this.refreshMenu();
            //app.refreshMenu();

            // Check if the client is logged in and try to silent login,
            // if there was a previous login not succeeded by a logout.
        },
        login: function() {
            // Calls Google API and permorms validation with the server
        },
        logout: function() {
            // Wipe user data from the app
        },
        getMenu: function() {
            // Returns the cached menu
            return dummyData; // Replace this by an access to the cached var in local storage
        },
        refreshMenu: function() {
            // Refresh the cached menu and, if modified, notify the gui
            // about the changes
            app.methods.updateSwiper();
        },
        submitFeedback(feedback) {
            // Uses POST to send the feedback to the server.
            // feedback: {
            //    note,
            //    comment
            // }
        }
    }
})();

app.methods.initialize();
document.addEventListener('deviceready', () => {
    client.initialize();
}, false);