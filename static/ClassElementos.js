var component = (function (){

	function montaViewCanal(arrOptions, gradeName){
		var ul = montaGrid(arrOptions, 'canais', 'canal');
		var gridElemento = document.getElementById(gradeName);
		if(gridElemento && ul){
			var nav = component.criarGenericElemento("menu", "nav");
			nav.appendChild(ul);
			gridElemento.appendChild(nav);
		}
	}

	function montaViewVideo(arrOptions, gradeName){
		var rota = window.location.hash + '/video';
		var ul = montaGrid(arrOptions, rota, 'videos');
		var gridElemento = document.getElementById(gradeName);
		if(gridElemento && ul){
			gridElemento.appendChild(ul);
		}
	}

	function montaGrid(arrOptions, rota, anchorClass){
		var ul;
		if(Array.isArray(arrOptions)){
			ul = component.criarGenericElemento("lista", "ul");
			arrOptions.forEach(function(item) {
				ul.appendChild(criaElementGrade(item.url, item.id, anchorClass, rota, item.paramRota));
			});

		}
		return ul;
	}


	function criaElementGrade(imagemUrl, elementId, anchorClass, rota, paramRota) {
		var elementoParent = criarGenericElemento('grid-item', "li");
		var elementoChild = criarGenericElemento('img-container', "div");
		var elementoImg = criaElementImagem(imagemUrl);
		var anchor = criaElementAncora(rota, elementId, anchorClass, paramRota);
		anchor.appendChild(elementoImg);
		elementoChild.appendChild(anchor);
		elementoParent.appendChild(elementoChild);
		return elementoParent;
	}

	function criarGenericElemento(className, tag){
		var elementoParent = document.createElement(tag);
		elementoParent.className = className;
		return elementoParent;		
	}

	function criaElementImagem(imagemUrl){
		var elementoImg = document.createElement('img');
		elementoImg.src = imagemUrl;
		return elementoImg;
	}
	function criaElementDiv(className){
		var elementoParent = document.createElement('div');
		elementoParent.className = className;
		return elementoParent;
	}

	function criaElementAncora(nameRota, idElement, nomeClass, paramRota){
		idElement = idElement || "";
		nomeClass = nomeClass || "";
		paramRota = paramRota || "";
		nameRota = nameRota || "";
		nameRota = nameRota.replace('#/', '');

		var anchor = document.createElement('a');
		anchor.href = "/#/"+ nameRota + "/" + paramRota;
		anchor.id = idElement;
		anchor.className = paramRota;

		return anchor;
	}

	function clearGrade(grid){
		document.getElementById(grid).innerHTML = "";
	}

	return {
		criaElementGrade: criaElementGrade,
		criaElementImagem: criaElementImagem,
		criaElementDiv: criaElementDiv,
		criaElementAncora: criaElementAncora,
		clearGrade: clearGrade,
		criarGenericElemento: criarGenericElemento,
		montaViewCanal: montaViewCanal,
		montaViewVideo : montaViewVideo
	};
})();


