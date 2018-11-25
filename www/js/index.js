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

            document.getElementById('publish-review').addEventListener('click',() => {
                rating = document.querySelector('input[name="rating"]:checked').value;
                review = document.getElementById('review').value;
                if (client.submitReview({rating, review}) == 'ERR_USER_NOT_LOGGED_IN') {
                    alert('Precisa estar logado para publicar reviews');
                }
            });

            if(client.isUserLoggedIn()) {
                document.getElementById('login-logout-button').innerHTML =
                '<a href="#" onclick="client.logout()" class="panel-close">Logout</a>';
            }
            else {
                document.getElementById('login-logout-button').innerHTML = 
                '<a href="#" data-login-screen=".login-screen"'+
                'class="login-screen-open panel-close">Login / Registrar</a>';
            }
        },
        updateSwiper: function(menu) {
            // [ TODO ]
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
        },

        // This function will be called periodically to update the list of reviews
        // and the average rating of the day
        updateReviews: function(reviewList, averageRating) {
            var str = "";

            reviewList.forEach((review) => {
                str += '<li class="item-content item-output">';
                str += '<div class="item-media">';
                str += '<img src="./img/icon.png" class="icon avatar">';
                str += '</div>';
                str += '<div class="item-inner">';
                str += '<div class="item-title item-label">'+review.userPublicName+'</div>';
                str += '<div>';
                str += '<p>'+review.review+'</p>';
                str += '</div></div></li>'
            });

            document.getElementById('comments').innerHTML = str;
        }
    }
});

var client = (() => {

    var userLoggedIn = false;

    var lastReview = "";

    function processReceivedMenu(receivedMenu) {
        // Merge with existent data
        var cachedMenu = JSON.parse(localStorage.getItem('cachedMenu'));
        if(cachedMenu) {
            // if ( equals(cachedMenu, receivedMenu) ), then
            localStorage.setItem('cachedMenu', JSON.stringify(
                Object.assign(cachedMenu, JSON.parse(receivedMenu))
            ));
            app.methods.updateSwiper(cachedMenu);
        }
        else {
            localStorage.setItem('cachedMenu', receivedMenu);
            app.methods.updateSwiper(cachedMenu);
        }
    }

    function getReviewList() {
        var xhttp = new XMLHttpRequest();
        /*
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                app.methods.updateReviews(JSON.parse(this.responseText), 4);
            }
        };
        xhttp.open("GET", "http://localhost:3000/review", true);
        xhttp.send();
        */
        app.methods.updateReviews([
            {
                ratingId: 1234,
                userPublicName: 'Lucas',
                review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dignissim nisl eu tortor egestas, id porttitor ipsum fermentum.',
                rating: 2
            },
            {
                ratingId: 1235,
                userPublicName: 'Luan',
                review: 'Sed in ligula eu diam aliquet rutrum.',
                rating: 5
            }
        ], 4);
    }

    function validateSession() {
        var userCredentials = localStorage.getItem('userCredentials');
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "VALID_SESSION") {
                    userLoggedIn = true;
                }
                else if (userCredentials) {
                    client.login(userCredentials.username, userCredentials.password);
                }
                else {
                    userLoggedIn = false;
                }
            }
        };
        xhttp.open("GET", "http://localhost:3000/validatesession", true);
        xhttp.send();
    }

    return {
        initialize: function() {
            // Refresh the cached menu
            this.refreshMenu();
            //app.refreshMenu();

            // Check if the client is logged in and try to silent login,
            // if there was a previous login not succeeded by a logout.
            validateSession();

            setInterval(() => {
                getReviewList();
            }, 10000);
        },
        login: function(username, password) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    userLoggedIn = true;
                }
            };
            xhttp.open("POST", "http://localhost:3000/login", true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify({username, password}));
        },
        logout: function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    userLoggedIn = false;
                }
            };
            xhttp.open("GET", "http://localhost:3000/logout", true);
            xhttp.send();
        },
        isUserLoggedIn() {
            return userLoggedIn;
        },
        getMenu: function() {
            // Returns the cached menu
            return JSON.parse(localStorage.getItem('cachedMenu'));
        },
        refreshMenu: function () {
            // Refresh the cached menu and, if modified, notify the gui
            // about the changes
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    processReceivedMenu(this.responseText);
                }
            };
            xhttp.open("GET", "http://localhost:3000/cardapio", true);
            xhttp.send();
        },
        submitReview(review) {
            if (!userLoggedIn) {
                lastReview = review;
                return 'ERR_USER_NOT_LOGGED_IN';
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Message sent");
                }
            };
            xhttp.open("POST", "http://localhost:3000/review", true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify(review));
        }
    }
})();

app.methods.initialize();
//document.addEventListener('deviceready', () => {
    client.initialize();
//}, false);