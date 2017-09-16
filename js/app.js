(function(){
	var cats = [{
			name: "Kity",
			alt: "Kity",
			src: "img/cat1.jpg",
			counter : 0
	},{
			name: "Meosy",
			alt: "Meosy",
			src: "img/cat2.jpg",
			counter : 0
	}];

	for(i = 0 ; i<cats.length ; i++){
		var cat = '#cat' + i,
			counterSelector = document.querySelector(cat + ' .counter'),
			name = document.querySelector(cat + ' .catName'),
			img = document.querySelector(cat + ' .catImg');

		name.innerText = cats[i].name;
		img.src = cats[i].src;
		img.alt = cats[i].alt;


		img.addEventListener('click',(function(catCopy,counterSelectorCopy){
			return function(){	
			catCopy.counter++;
			counterSelectorCopy.innerText = catCopy.counter;
			}
		})(cats[i],counterSelector),false);

	}

})();