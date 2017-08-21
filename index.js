var expr = {};
(function() {
	var gradeArr = [];
	var channelLista = [{
		'Galinha Pintadinha': 'UCBAb_DK4GYZqZR9MFA7y2Xg',
		'url' : 'ping.jpg'
	}, {
		'Boo Zoom': 'UCZcsG6kUpOLQZZpTMSAernw',
		'url' : 'ping.jpg'
	}, {
		'Patati Patata': 'UCe-BBpsnL89BMr6WbvBQ9dw',
		'url' : 'ping.jpg'
	}, {
		'Masha e o Urso': 'UCJKBSfD5JSUxGhriFeoPCCg',
		'url' : 'ping.jpg'
	}, {
		'Charlie e Lola': 'UCFQNGbgX19oYzszXGJ5LYzQ',
		'url' : 'ping.jpg'
	}, {
		'Peppa': 'UCFQNGbgX19oYzszXGJ5LYzQ',
		'url' : 'ping.jpg'
	}];

	function pegaElement(id) {
		return document.getElementById(id);
	}

	function chamaChannelServico(canalId) {
		var urlOpt = {
			part: 'snippet,id',
			key: 'AIzaSyCy0uLrSAshvlG-Dd4XjkdeCUmoYqh3Utg',
			channelId: canalId,
			order: 'date',
			maxResults: 20


		};
		var url = 'https://www.googleapis.com/youtube/v3/search?';
		url = url.concat('part=' + urlOpt.part, '&key=' + urlOpt.key,
			'&channelId=' + urlOpt.channelId, '&order=' + urlOpt.order, '&maxResults=' + urlOpt.maxResults);
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", respostaGridEscutador);
		oReq.open('GET', url);
		window.history.pushState("object or string", "Title", "/canais");
		oReq.send();

	}

	function respostaGridEscutador(data) {
		if (data.currentTarget) {
			try {
				var itemsGrade = JSON.parse(data.currentTarget.response);
				itemsGrade = itemsGrade && itemsGrade.items ? itemsGrade.items : undefined;
				var htmlGrade = mapCanalList(itemsGrade);
				montaGrid(htmlGrade, 'grid');
			} catch (e) {
				console.error(e);
			}
		}
		
	}
	

	function montaGrid(htmlGrade, gradeName){
		if(Array.isArray(htmlGrade)){
		var gridElemento = pegaElement(gradeName);
		if (gridElemento) {
			htmlGrade.forEach(function(item) {
				gridElemento.appendChild(criaElementGrade(item.url));
			});
		}
		}
	}

	function criaElementGrade(src) {
		var elemento = document.createElement('div');
		var elementoImg = document.createElement('img');
		elementoImg.src = src;
		elemento.appendChild(elementoImg);
		return elemento;
	}

	function iniciarApplication() {
		chamaChannelServico('UCBAb_DK4GYZqZR9MFA7y2Xg');
		//montaGrid(channelLista, 'grid');
	}

	function mapCanalList(items){
		var mapaArr = [];
		if(Array.isArray(items)){
			mapaArr = items.filter(function(item){
				return item.snippet.thumbnails && item.snippet.thumbnails.default;
			}).map(function(item){
				return item.snippet.thumbnails.default;

			});
		}
		return mapaArr;
	}
	expr.iniciarApplication = iniciarApplication;
})();