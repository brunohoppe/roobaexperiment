var expr = (function() {
    var gradeArr = [];

    var pathCanais = '^#\/canais$';
    var pathVideos = '^#\/canais\/(galinhapintadinha|bobzoomclub|mashaeourso|luna|peppa|bita|patatipatata|charlielola)$';
    var pathPlayer = '^#\/canais\/(galinhapintadinha|bobzoomclub|mashaeourso|luna|peppa|bita|patatipatata|charlielola)\/video';
    var pathGeral = new RegExp(pathPlayer + "|" + pathVideos + "|" + pathCanais);

    var channelLista = [{
        'id': 'UCBAb_DK4GYZqZR9MFA7y2Xg',
        'url': 'img/galinhapintadinha.jpg',
        'paramRota': "galinhapintadinha",
        'galinhapintadinha': 'UCBAb_DK4GYZqZR9MFA7y2Xg'
    }, {
        'id': 'UCZcsG6kUpOLQZZpTMSAernw',
        'url': 'img/bobzoom.jpg',
        'paramRota': "bobzoomclub",
        'bobzoomclub': 'UCZcsG6kUpOLQZZpTMSAernw'
    }, {
        'id': 'UCe-BBpsnL89BMr6WbvBQ9dw',
        'url': 'img/patatipatata.jpg',
        'paramRota': "patatipatata",
        'patatipatata': 'UCe-BBpsnL89BMr6WbvBQ9dw'
    }, {
        'id': 'UCJKBSfD5JSUxGhriFeoPCCg',
        'url': 'img/mashaeourso.jpg',
        'paramRota': "mashaeourso",
        'mashaeourso': 'UCJKBSfD5JSUxGhriFeoPCCg'
    }, {
        'id': 'UCFQNGbgX19oYzszXGJ5LYzQ',
        'url': 'img/charlielola.gif',
        'paramRota': "charlielola",
        'charlielola': 'UCFQNGbgX19oYzszXGJ5LYzQ'
    }, {
        'id': 'UCAOtE1V7Ots4DjM8JLlrYgg',
        'url': 'img/peppa.jpg',
        'paramRota': "peppa",
        'peppa': 'UCAOtE1V7Ots4DjM8JLlrYgg'
    }, {
        'id': 'UCsr34saf-NXrh11hk4ESRdQ',
        'url': 'img/bita.jpg',
        'paramRota': "bita",
        'bita': 'UCsr34saf-NXrh11hk4ESRdQ'
    }, {
        'id': 'UC-adUJnjdrRnRlOJGoDtTqw',
        'url': 'img/luna.jpg',
        'paramRota': "luna",
        'luna': 'UC-adUJnjdrRnRlOJGoDtTqw'
    }];

    function chamaChannelServico(canalId) {
        var urlOpt = {
            part: 'snippet,id',
            key: 'AIzaSyCy0uLrSAshvlG-Dd4XjkdeCUmoYqh3Utg',
            channelId: canalId,
            order: 'date',
            maxResults: 20,
            type: 'video'
        };
        var url = 'https://www.googleapis.com/youtube/v3/search?';
        url = url.concat('part=' + urlOpt.part, '&key=' + urlOpt.key,
            '&channelId=' + urlOpt.channelId, '&order=' + urlOpt.order, '&maxResults=' + urlOpt.maxResults, '&type=' + urlOpt.type);
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", respostaGridEscutador);
        oReq.open('GET', url);
        oReq.send();
    }

    function respostaGridEscutador(data) {
        if (data.currentTarget) {
            try {
                var itemsGrade = JSON.parse(data.currentTarget.response);
                itemsGrade = itemsGrade && itemsGrade.items ? itemsGrade.items : undefined;
                var htmlGrade = mapCanalList(itemsGrade);
                component.montaViewVideo(htmlGrade, 'grid-video');
            } catch (e) {
                console.error(e);
            }
        }

    }

    function iniciarApplication() {
        setEventoHistory();
    }

    function mapCanalList(items) {
        var mapaArr = [];
        if (Array.isArray(items)) {
            mapaArr = items.filter(function(item) {
                return item.snippet.thumbnails && item.snippet.thumbnails.medium;
            }).map(function(item) {
                return {
                 url: item.snippet.thumbnails.medium.url,
                 paramRota: item.id.videoId  
                };

            });
        }
        return mapaArr;
    }

    function loadTelaChannel() {
    	component.clearGrade('grid');
        component.montaViewCanal(channelLista, 'grid');
    }

    function loadTelaMovies(canalId) {
        if (canalId) {
            chamaChannelServico(canalId);
        }
    }

    function loadPlayer(videoId) {
        document.getElementById('player').className = "show";
        document.getElementById('player').src = 'https://www.youtube.com/embed/' + videoId;
    }

    function setEventoHistory() {
    	setInicialState();
        window.onpopstate = function(event) {
            setaStateTelas();
        };

    }

    function configCanalPath() {
        var canalNome = window.location.hash.split("/")[2];
        var canalId = channelLista.filter(function(item, key) {
            return item[canalNome] === item.id;
        })[0];
        document.getElementById("grid").className = "min";
        document.getElementById("player").className = "";
        component.clearGrade('grid-video');
        loadTelaMovies(canalId.id);
    }

    function configCanaisPath() {
        document.getElementById("grid").className = "";
        document.getElementById("player").className = "";
        component.clearGrade('grid-video');
        loadTelaChannel();
    }

    function configVideosPath(argument) {
        var videoId = window.location.hash.split("/")[4];
    	loadPlayer(videoId);
    }

    function verificaLocation(pattern) {
    	var hash = window.location.hash;
        switch (true) {
            case hash.match(/^#\/canais$/) !== null:
                configCanaisPath();
                break;
            case hash.match(/^#\/canais\/[a-zA-Z]+$/) !== null:
                configCanalPath();
                break;
            case hash.match(/^#\/canais\/[a-zA-Z]+\/[a-zA-Z]+/) !== null:
                
                configVideosPath();
                break;
            default:
                break;
        }
    }

    function verificaInitLocalizao(){
    	var hash = window.location.hash;
        switch (true) {
            case hash.match(/^#\/canais$/) !== null:
                configCanaisPath();
                break;
            case hash.match(/^#\/canais\/[a-zA-Z]+$/) !== null:
            	configCanaisPath();
                configCanalPath();
                break;
            case hash.match(/^#\/canais\/[a-zA-Z]+$\/[a-zA-Z]+/):
            	configVideosPath();
                break;
            default:
                break;
        }
    }

    // function mountCaminhoChannel(arrayCanal){
    // 	var pathString = "";
    // 	arrayCanal.map(function(item){
    // 		return item.paramRota;
    // 	}).forEach(function(item){
    // 		pathString = pathString.concat(item) + "|";
    // 	});
    // 	pathString = pathString + "877649987Kll@3";
    // 	return pathString;
    // }

    // function verificaHash() {
    //     var pattert = /canais\/[a-zA-Z]+|canais/;
    //     var patt = pattert.exec(window.location.hash);
    //     return patt ? patt[0] : [];
    // }

    function retornaPath(){
    	var matched = window.location.hash.match(pathGeral);
    	return matched ? matched[0] : undefined;
    }

    function checkHash() {
        var path = retornaPath();
        window.location.hash = path ? window.location.hash: '/canais';
        // if(path){
        // 	verificaLocation();
        // }else{
        // 	window.location.hash = '/canais';
        // }
        
        
    }

    function setInicialState(){
    	// component.clearGrade('grid');
     //    component.clearGrade('grid-video');
        checkHash();
        verificaInitLocalizao();
    }

    function setaStateTelas(){
    	checkHash();
    	verificaLocation();	
    }
    function updateTransition() {
        var el1 = document.querySelector(".el-small");
        var el2 = document.querySelector(".el-big");
        var el3 = document.querySelector(".el-media");
        if (el1) {
          el1.classList.remove("el-small");
          el1.classList.add("el-media");
        }
        if (el2) {
          el2.classList.remove("el-big");
          el2.classList.add("el-small");
        }
        if (el3) {
          el3.classList.remove("el-media");
          el3.classList.add("el-big");      
        }
         
        return;
      }
      
      var intervalID = window.setInterval(updateTransition, 500);
    return iniciarApplication;
})();