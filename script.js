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

$(document).ready(function(){
    resize();
    link();
});

$(window).resize(function(){
    resize();
});