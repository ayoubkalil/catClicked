(function(){

/* ----------------- the Model ---------------- */
var	model = {
		cats : [
		{
				name: "Kitty",
				alt: "Kitty",
				src: "img/cat1.jpg",
				counter : 0
		},
		{
				name: "Tiger",
				alt: "Tiger",
				src: "img/cat2.jpg",
				counter : 0
		},
		{
				name: "Milo",
				alt: "Milo",
				src: "img/cat3.jpg",
				counter : 0
		},
		{
				name: "Daisy",
				alt: "Daisy",
				src: "img/cat4.jpg",
				counter : 0
		},
		{
				name: "Luna",
				alt: "Luna",
				src: "img/cat5.jpg",
				counter : 0
		}
		],
		currentCat : null
};


/* ----------------- the Controller ---------------- */
var	controller = {
		init: function(){

			this.setCurrentCat(model.cats[0]);
			catListView.init();
			catView.init();
		},
		setCurrentCat:function(cat){
			model.currentCat = cat;
		},
		getCurrentCat:function(){
			return model.currentCat;
		},
		clickCounter:function(){
			this.getCurrentCat().counter++;
			catView.render();
		},
		getCats:function(){
			return model.cats;
		}

};

/* ----------------- the View of List of cats ---------------- */

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('catList');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the controller
        var cats = controller.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)

            // model.arr.push(
            //     (function(catCopy){
            //         return function() {
            //         controller.setCurrentCat(catCopy);
            //         catView.render();
            //         console.log(catCopy.name);
            //         }
            //     }(cat))
            // );
            
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};
/* ----------------- the View of the current Cat ---------------- */

	catView = {
		init: function(){
		 	this.counterSelector = document.querySelector('#cat .counter');
			this.name = document.querySelector('#cat .catName');
			this.img = document.querySelector('#cat .catImg');

			// add event listener to the image for counting the clicks of the current image 
			this.img.addEventListener('click', function(){
					console.log(controller.getCats());
					controller.clickCounter();	
			},false);

			this.render();
		},
		render : function(){
			var currentCatX = controller.getCurrentCat();
			this.name.textContent = currentCatX.name;
			this.img.src = currentCatX.src;
			this.img.alt = currentCatX.alt;
			this.counterSelector.textContent = currentCatX.counter;
		}
	}

	controller.init();
})();