var body 	= document.getElementsByTagName('body')[0],
	loader  = document.createElement('div');

var preloader = {

	show: function(){

		loader.setAttribute('id','preloader');
		addClass(body, 'overflow');
		body.appendChild(loader);
	},

	hide: function(){

		fadeOut(loader);
		removeClass(body, 'overflow');
	}
};
