function resize(){
    var scr_ht = $(window).height();
    var scr_wd = $(window).width();
    
    $("#big-picture").height(scr_ht - $("#nav-bar").height());
    $("#big-picture").css("margin-left", 
                          (scr_wd - $("#big-picture").width()) / 2 );
    
    $("#content-strip").css("margin-top",
                           -scr_ht);
    $("#content-strip").css("padding-top",
                           scr_ht);
    
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
    resize();
    link();
    enable_slow_scroll();
    
});

$(window).resize(function(){
    resize();
});

