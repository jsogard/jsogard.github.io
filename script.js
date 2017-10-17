function resize(all){
    var scr_ht = $(window).height();
    var scr_wd = $(window).width();
	
	/* RESIZE COLLAGE */
	$collage = $("#collage");
	var collage_max_ht = scr_ht - $("#nav-bar").height() - $collage.outerHeight() + $collage.innerHeight();
	var collage_max_wd = scr_wd * 0.9 - $collage.outerWidth() + $collage.innerWidth();
	if(collage_max_wd / 2 > collage_max_ht){
		collage_max_wd = collage_max_ht * 2;
	}
	else{
		collage_max_ht = collage_max_wd / 2;
	}
	$("#collage").width(collage_max_wd);
	$("#collage").height(collage_max_ht);
	
	
    var $strip = $("#content-strip");
    
    $strip.css("margin-top", 0);
//    $strip.css("padding-top", scr_ht);
    if(!all) return;
    
    var bottom_buffer = scr_ht - $("#nav-bar").height()
              - $(".pane-break").css("margin-bottom")
              - $(".content:last").height()
    
    $strip.css("padding-bottom", 
               bottom_buffer > 0 ? bottom_buffer : 0);
    
    //$("#experience .logo").attr("max-height", $("#experience .job-logo-div").height());
}

function link(){
    $(".content").each(function(index){
        var name = $(this).attr('id');
        $("#nav-bar table tr").append(
            "<td>\
                <a href=\"#" + name + "\">" + name + "</a>\
            </td>");
    });
}

function enable_slow_scroll(){
    $("a[href^='#']").click(function(){
        var aTag = $($(this).attr('href'));
        $('html,body').animate({scrollTop: aTag.offset().top - 
                                $('#nav-bar').height() - 15}, 'slow'); //make this dynamic to the .pane-break margin
    });
}

$(document).ready(function(){
    resize(true);
    link();
    enable_slow_scroll();
    
});

$(window).resize(function(){
    resize(false);
	
});

