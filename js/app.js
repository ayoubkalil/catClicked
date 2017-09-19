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
		currentCat : null,
		addCat : function(cat){
			this.cats.push(cat);
		}
};


/* ----------------- the Controller ---------------- */
var	controller = {
		
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
		},
		addCatToList:function(){

			var name = document.getElementById("catNameInput"),
				image = document.getElementById("catImgInput"),
				clicks = document.getElementById("catCounterInput"),
				frm = document.getElementById('adminPanel-form');
			
			name = name.value || 'Unnamed';
			image = image.value || 'img/no-thumb.png';
			clicks = clicks.value || 0;
			model.addCat({name:name,
				alt:name,
				src:image,
				counter:clicks
			});


		   	frm.reset();  // Reset

			catListView.render();
			model.currentCat = model.cats[model.cats.length - 1];
			catView.render();

		   
		},
		init: function(){
			
			this.adminButton = document.getElementById("admin");
			this.saveButton = document.getElementById("save");
			this.cancelButton = document.getElementById("cancel");
			adminView.init();
			adminView.hide();
			

			this.adminButton.addEventListener("click",function(e){
					adminView.render();
					e.preventDefault();
			},false);

			this.saveButton.addEventListener("click",(function(callback){
				return function(e){
					callback();
					e.preventDefault();
				}
			})(this.addCatToList),false);

			this.cancelButton.addEventListener("click",function(e){
				adminView.hide();
				e.preventDefault();
			},false);

			this.setCurrentCat(model.cats[0]);
			catListView.init();
			catView.init();
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

var	catView = {
		init: function(){
		 	this.counterSelector = document.querySelector('#cat .counter');
			this.name = document.querySelector('#cat .catName');
			this.img = document.querySelector('#cat .catImg');

			// add event listener to the image for counting the clicks of the current image 
			this.img.addEventListener('click', function(){
					// console.log(controller.getCats());
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

/* ----------------- Panel Admin View ---------------- */

var	adminView = {
		init : function(){
			this.adminPanel = document.getElementById('adminPanel');
		},
		render:function(){
			this.adminPanel.style.display = "block";
		},
		hide:function(){
			this.adminPanel.style.display = "none";
		}
	}


	controller.init();
})();