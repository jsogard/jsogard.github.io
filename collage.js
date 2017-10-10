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
				this.paths[k].push("./collage/" + k + "/" + base_path);
			}
		}
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
}


$(document).ready(function(){
	
	// TODO personal differences:
	var $collage = $("#collage");
	var changeInterval_ms = 1000;
	var templates = [
		new CollageTemplate($collage, function($collage){
			/*
			 __________________
			|      |    |      |
			|______|    |______|
			|      |    |      |
			|______|____|______|
			*/
			this.put_new_div($collage, 0, 0, 3, 2);
			this.put_new_div($collage, 0, 2, 3, 2);
			this.put_new_div($collage, 5, 0, 3, 2);
			this.put_new_div($collage, 5, 2, 3, 2);
			this.put_new_div($collage, 3, 0, 2, 4);
		}),
		new CollageTemplate($collage, function($collage){
			/*
			 _______________
			|   |_|_|   |___|
			|   |   |   |   |
			|___|   |___|   |
			|___|___|_|_|___|
			*/
			this.put_new_div($collage, 0, 0, 2, 3);
			this.put_new_div($collage, 2, 1, 2, 3);
			this.put_new_div($collage, 4, 0, 2, 3);
			this.put_new_div($collage, 6, 1, 2, 3);

			this.put_new_div($collage, 0, 3, 2, 1);
			this.put_new_div($collage, 6, 0, 2, 1);

			this.put_new_div($collage, 2, 0, 1, 1);
			this.put_new_div($collage, 3, 0, 1, 1);
			this.put_new_div($collage, 4, 3, 1, 1);
			this.put_new_div($collage, 5, 3, 1, 1);
		}),
		new CollageTemplate($collage, function($collage){
			/*
			 ____________________
			|    |  |    |       | 
			|____|__|    |_______|   
			|       |    |  |    |  
			|_______|____|__|____|


			*/
			this.put_new_div($collage, 0, 0, 2, 2);
			this.put_new_div($collage, 6, 2, 2, 2);

			this.put_new_div($collage, 5, 0, 3, 2);
			this.put_new_div($collage, 0, 2, 3, 2);

			this.put_new_div($collage, 2, 0, 1, 2);
			this.put_new_div($collage, 5, 2, 1, 2);

			this.put_new_div($collage, 3, 0, 2, 4);
		}),
		new CollageTemplate($collage, function($collage){
			/*
			 ____________________ 
			|____|  |    |  |____|
			|    |__|____|__|    |
			|    |    |     |    |
			|____|____|_____|____|
			*/
			this.put_new_div($collage, 0, 0, 2, 1);
			this.put_new_div($collage, 6, 0, 2, 1);

			this.put_new_div($collage, 2, 0, 1, 2);
			this.put_new_div($collage, 5, 0, 1, 2);

			this.put_new_div($collage, 0, 1, 2, 3);
			this.put_new_div($collage, 6, 1, 2, 3);

			this.put_new_div($collage, 3, 0, 2, 2);
			this.put_new_div($collage, 2, 2, 2, 2);
			this.put_new_div($collage, 4, 2, 2, 2);
		}),
		new CollageTemplate($collage, function($collage){
			/*
			 ____________________ 
			|  |    |    |    |  |
			|__|____|    |____|__|
			|       |    |       |
			|_______|____|_______|
			*/
			this.put_new_div($collage, 0, 0, 1, 2);
			this.put_new_div($collage, 7, 0, 1, 2);

			this.put_new_div($collage, 1, 0, 2, 2);
			this.put_new_div($collage, 5, 0, 2, 2);

			this.put_new_div($collage, 0, 2, 3, 2);
			this.put_new_div($collage, 5, 2, 3, 2);

			this.put_new_div($collage, 3, 1, 2, 3);

			this.put_new_div($collage, 3, 0, 2, 1);
		}),
		
	];  
	
	/* DONT TOUCH BELOW THIS */
    CollageTemplate.X1 = $collage.width() / 8;
    CollageTemplate.Y1 = $collage.height() / 4;
	
	jQuery.ajax(
		"./get_pic_paths.php",
		{
			async: false,
			data: {
				"root": "./img/collage"
			},
			success: function(data, status, xhr){
				CollageTemplate.pic_paths = $.parseJSON(data);
			}
		}
	);
	
	var curr_template = -1;
	
	function get_random_template_index(){
		return Math.floor(Math.random()*templates.length);
	}
	
	function generate_new_template(must_change){
		var new_index;
		do{
			new_index = get_random_template_index();
		}while(curr_template == new_index && must_change);
		
		templates[new_index].populate();
		curr_template = new_index;
	}
	generate_new_template(true);
	
	setInterval(function(){generate_new_template(true);}, changeInterval_ms);
	
    
    
});