class CollageTemplate{
	
	constructor($collage, create_func){
		this.create = create_func;
		
		this.populate = function(){
			if($collage.children().length == 0){
				this.copy_pic_paths();
				this.create($collage);	
				$collage.find("img").show();
			}
			else{
				var that = this;
				$collage.find("img").fadeOut(500, function(){
					$collage.empty();
					that.copy_pic_paths();
					that.create($collage);
					$collage.find("img").fadeIn(500);
				})
			}
			
		}
	}
	
	copy_pic_paths(){
		this.paths = {};
		for(var k in CollageTemplate.pic_paths){
			this.paths[k] = [];
			for(var i in CollageTemplate.pic_paths[k]){
				var base_path = CollageTemplate.pic_paths[k][i];
				this.paths[k].push("./img/collage/" + k + "/" + base_path);
			}
		}
		console.log(this.paths);
	}
	
	get_pic_path(width, height){
		if(width == height){
			width = 1;
			height = 1;
		} else if(width == 2 && height == 4 ||
				 width == 4 && height == 2){
			width /= 2;
			height /= 2;
		}
		
		var album = this.paths["" + width + "x" + height];
		if(album == null || album.length == 0) return null;
		var index = Math.floor(Math.random()*album.length);
		var path = album[index];
		album.splice(index, 1);
		return path;
	}
	
	get_div_element(x, y, width, height){
		height = CollageTemplate.Y1 * height - 5;
		width = CollageTemplate.X1 * width - 5;
		var left = x * CollageTemplate.X1;
		var top = y * CollageTemplate.Y1;
		var div = $("<div>", {class: "collage-pic"});
        div.css({
            "width": 	width + "px",
            "height": 	height + "px",
            "top": 		top + "px",
            "left": 	left + "px"
        });
		return div;
	}
	
	put_new_div($collage, x, y, width, height){
		
		var src = this.get_pic_path(width, height);
		var div = this.get_div_element(x, y, width, height);
		var img = $("<img/>",{
			src: src
		});	
		
		img.css({
			"width": "auto",
			"height": "auto",
			"display":	"none"
		});
		
		div.append(img);
		$collage.append(div);
		
		img.css(
			(
				img.width() / img.height() > width / height ?
				{ // img is proportionally wider than pic
					"width": "auto",
					"height": "100%"
				} :
				{ // img is proportianlly taller than pic
					"width": "100%",
					"height": "auto"
				}
			)
		);
		div.css("overflow", "hidden");
	}

	preload_image(img_src, callback){
		var image = new Image();
		image.src = img_src;

		if(image.complete){
			callback();
		}
		else{
			image.onload = function(){
				callback();
			}
			$(image.parentElement).css("background-color", "#f00");
		}
	}
	
}


$(document).ready(function(){
	
	class DimensionCollection{
		
		/* DimensionCollection is a collection of images with the same basic dimensions
		 * on creation the dimension is defined
		 * x, y: unit dimensions of images belonging in this collection
		 */
		constructor(x, y){
			this.X = x;
			this.Y = y;
			this.Images = [];
		}
		
		/* Adds an image with the provided source for storage and starts loading it
		 * source: the source of the image to add
		 */
		addImage(source){
			
			this.Images.push($("<img/>", {
				src: source,
				css: {
					"height": "100%",
					"width": "100%",
					"object-fit": "cover",
				}
			}));
		}
		
		/* Returns a random image from this images container
		 * TODO: dont give repeat images
		 */
		getImage(){
			
			var index = Math.floor(Math.random() * this.Images.length);
			return this.Images[index];
			
			// account for not giving the same image twice
		}
	}
	
	class Collage{
		
		/* Creates a new template for a collage
		 * parent: the parent div representing the collage
		 * creation: function for initializing the divs of collage
		 */
		constructor(parent, creation){
			this.TILES_X = 8;
			this.TILE_WIDTH = parent.width() / this.TILES_X;
			
			this.TILES_Y = 4;
			this.TILE_HEIGHT = parent.height() / this.TILES_Y;
			
			this.parent = parent;
			this.initialize_divs = creation;
			var _this = this;
			
			this.populate = function(){
				parent.children().remove();
				_this.initialize_divs(parent);
			}
		}
		
		create_div(x_coordinate, y_coordinate, x_dimension, y_dimension){
			var dimension = x_dimension + 'x' + y_dimension;
			var $div = $("<div/>", {
				class: 'collage-pic ' + dimension,
				css: {
					height: (this.TILE_HEIGHT * y_dimension - 5) 	+ 'px',
					width: 	(this.TILE_WIDTH * x_dimension - 5) 	+ 'px',
					top: 	(this.TILE_HEIGHT * y_coordinate) 		+ 'px',
					left: 	(this.TILE_WIDTH * x_coordinate) 		+ 'px',
					overflow: "hidden"
				}
			});
			
			$div.append(this.get_loading_image());
			
			
			
			
			this.parent.append($div);
			
		}
		
		get_image(source, dimension){
			if(source in IMAGE_HOLDER[dimension]){
				create_image(source, function($img){
					$div.children[0].replaceWith($img);
					IMAGE_HOLDER[dimension][d] = $img;
					return_img = $img;
				});
			} else if(true) {
				
			}
		}
		
		create_image(source, onload){
			$("<img/>", {
				src: source,
				css: {
					"height": "100%",
					"width": "100%",
					"object-fit": "cover",
				},
				onload: function(){
					onload(this);
				}
			});
		}
		
		get_loading_image(){
			return $("<img/>", {
				src: "img/loading.gif",
				css: {
					"height": "100%",
					"width": "100%",
					"object-fit": "cover",
				}
			});
		}
	}
	
	class ImageCollection{
		
		/* ImageCollection is a collection of DImensionCollections, storing all images 
		 */
		constructor(){
			this.ImageDict = [];
		}
		
		/* Adds the image with provided dimension and source to proper dimesnionCollection
		 * If no proper dimensionCollection exists, make one and fill it
		 * x_unit, y_unit: basic dimensions of image
		 * src: source path of image
		 */
		addImage(x_unit, y_unit, src){
			if(x_unit == y_unit){
				x_unit = 1;
				y_unit = 1;
			}
			
			var dimColl = getDimensionCollection(x_unit, y_unit);
			if(dimColl == null){
				dimColl = new DimensionCollection(x_unit, y_unit);
				this.ImageDict.append(dimColl);
			}
				
			dimColl.addImage(src);
		}
		
		/* Gets the DimensionCollection of specified dimensions from ImageDict, null if not existing
		 * x, y: basic dimesnions of dimensionCollection images
		 */
		getDimensionCollection(x, y){
			var filteredDimColls = this.ImageDict.keys().filter(
				function(dimColl){
					return dimColl.X == x && dimColl.Y == y;
				}
			);
			return filteredDimColls.length == 0 ? null : filteredDimColls[0];
		}
	}
	
	/// Element holding the collage images
	var $collage = $("#collage");
	/// Frequency of picture changes in ms
	var REFRESH_RATE = 10000;
	/// User-mad formats for collages
	var COLLAGE_TEMPLATES = [
		new Collage($collage, function($collage){
			/*
			 __________________
			|      |    |      |
			|______|    |______|
			|      |    |      |
			|______|____|______|
			*/
			this.create_div(0, 0, 3, 2);
			this.create_div(0, 2, 3, 2);
			this.create_div(5, 0, 3, 2);
			this.create_div(5, 2, 3, 2);
			this.create_div(3, 0, 2, 4);
		}),
		new Collage($collage, function($collage){
			/*
			 _______________
			|   |_|_|   |___|
			|   |   |   |   |
			|___|   |___|   |
			|___|___|_|_|___|
			*/
			this.create_div(0, 0, 2, 3);
			this.create_div(2, 1, 2, 3);
			this.create_div(4, 0, 2, 3);
			this.create_div(6, 1, 2, 3);

			this.create_div(0, 3, 2, 1);
			this.create_div(6, 0, 2, 1);

			this.create_div(2, 0, 1, 1);
			this.create_div(3, 0, 1, 1);
			this.create_div(4, 3, 1, 1);
			this.create_div(5, 3, 1, 1);
		}),
		new Collage($collage, function($collage){
			/*
			 ____________________
			|    |  |    |       | 
			|____|__|    |_______|   
			|       |    |  |    |  
			|_______|____|__|____|


			*/
			this.create_div(0, 0, 2, 2);
			this.create_div(6, 2, 2, 2);

			this.create_div(5, 0, 3, 2);
			this.create_div(0, 2, 3, 2);

			this.create_div(2, 0, 1, 2);
			this.create_div(5, 2, 1, 2);

			this.create_div(3, 0, 2, 4);
		}),
		new Collage($collage, function($collage){
			/*
			 ____________________ 
			|____|  |    |  |____|
			|    |__|____|__|    |
			|    |    |     |    |
			|____|____|_____|____|
			*/
			this.create_div(0, 0, 2, 1);
			this.create_div(6, 0, 2, 1);

			this.create_div(2, 0, 1, 2);
			this.create_div(5, 0, 1, 2);

			this.create_div(0, 1, 2, 3);
			this.create_div(6, 1, 2, 3);

			this.create_div(3, 0, 2, 2);
			this.create_div(2, 2, 2, 2);
			this.create_div(4, 2, 2, 2);
		}),
		new Collage($collage, function($collage){
			/*
			 ____________________ 
			|  |    |    |    |  |
			|__|____|    |____|__|
			|       |    |       |
			|_______|____|_______|
			*/
			this.create_div(0, 0, 1, 2);
			this.create_div(7, 0, 1, 2);

			this.create_div(1, 0, 2, 2);
			this.create_div(5, 0, 2, 2);

			this.create_div(0, 2, 3, 2);
			this.create_div(5, 2, 3, 2);

			this.create_div(3, 1, 2, 3);

			this.create_div(3, 0, 2, 1);
		}),
		
	];
	/// Initially contains image paths (whole path from root). Path strings replaced with loaded image elements when loaded
	/// Keyed by dimension string (ex. "3x1")
	var IMAGE_COLLECTION = new ImageCollection();
	/// JSON file name containing list of paths.  keyed by dimension string (ex. "3x1")
	var JSON_IMAGE_PATH = "/pic_paths.json";
	/// Path to images from root directory
	var IMAGE_SRC_PREFIX = "/img/collage/";
	
	
	
	/* get all image sources from a json file and puts the sorce path in the IMAGE_HOLDER
	 */
	function getImages(json_path, images){
		$.ajax(
			json_path,
			{
				async: false,
				success: function(json, status, xhr){
					$.each(json, function(key, dimension){
						IMAGE_HOLDER.push(key);
						$.each(dimension, function(index, source){
							IMAGE_HOLDER[key].push(IMAGE_SRC_PREFIX + key + '/' + source);
						});
					});
					console.log(IMAGE_HOLDER);
					generate_new_template(false);
					setInterval(function(){generate_new_template(false);}, REFRESH_RATE);
				}
			}
		);
	};
	
	
	
	function empty(parent){
		parent.children().remove();
	}
	
	
	
	/* DONT TOUCH BELOW THIS */
    Collage.X1 = $collage.width() / 8;
    Collage.Y1 = $collage.height() / 4;
	
	
	
	var curr_template = -1;
	
	function get_random_template_index(){
		return Math.floor(Math.random()*COLLAGE_TEMPLATES.length);
	}
	
	function generate_new_template(must_change){
		var new_index;
		do{
			new_index = get_random_template_index();
		}while(curr_template == new_index && must_change);
		
		COLLAGE_TEMPLATES[new_index].populate();
		curr_template = new_index;
	}
	
	
    getImages(JSON_IMAGE_PATH, IMAGE_HOLDER);
    
});