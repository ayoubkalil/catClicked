(function(){
	var cats = [{
			name: "Kitty",
			alt: "Kitty",
			src: "img/cat1.jpg",
			counter : 0
	},{
			name: "Tiger",
			alt: "Tiger",
			src: "img/cat2.jpg",
			counter : 0
	},{
			name: "Milo",
			alt: "Milo",
			src: "img/cat3.jpg",
			counter : 0
	},{
			name: "Daisy",
			alt: "Daisy",
			src: "img/cat4.jpg",
			counter : 0
	},{
			name: "Luna",
			alt: "Luna",
			src: "img/cat5.jpg",
			counter : 0
	}
	];

	

	var catList = document.getElementById("catList"),
		counterSelector = document.querySelector('#cat .counter'),
		name = document.querySelector('#cat .catName'),
		currentCat = cats[0],
		img = document.querySelector('#cat .catImg');


	for(i = 0 ; i<cats.length ; i++){
		
		var	cat = cats[i],
			

		// create cat list 
		elem = document.createElement('li');
		elem.innerText = cat.name;
		catList.appendChild(elem);


		// add event listener to each list item to display the cat 
		elem.addEventListener("click",(function(catCl){
			return function(){
				name.innerText = catCl.name;
				img.src = catCl.src;
				img.alt = catCl.alt;
				counterSelector.innerText = catCl.counter;
				currentCat = catCl;
			}
		})(cat),false);
	
		}

	// add event listener to the image for counting the clicks of the current image 
	img.addEventListener('click',function(){
			currentCat.counter++;
			counterSelector.innerText = currentCat.counter;	
		},false);

	name.innerText = cats[0].name;
	img.src = cats[0].src;
	img.alt = cats[0].alt;
	counterSelector.innerText = cats[0].counter;
})();