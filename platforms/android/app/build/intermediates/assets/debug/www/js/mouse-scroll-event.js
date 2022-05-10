$(function(){
    $.fn.inView = function(){
        //Window Object
        var win = $(window);
        //Object to Check
        obj = $(this);
        //the top Scroll Position in the page
        var scrollPosition = win.scrollTop();
        //the end of the visible area in the page, starting from the scroll position
        var visibleArea = win.scrollTop() + win.height();
        //the end of the object to check
        var objEndPos = (obj.offset().top + obj.outerHeight());
        return(visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false)
    };

    $(window).bind('mousewheel DOMMouseScroll', function(e){
        var id = $(".indicator:visible").attr('id');
        if( $(".indicator").inView() && $('#'+id).is(':visible') ){
            //console.log(id);
            $("#"+id).click();
        }
        e.stopImmediatePropagation();
    });

    $(window).bind('touchmove', function(e) { 
        var id = $(".indicator:visible").attr('id');
        if( $(".indicator").inView() && $('#'+id).is(':visible') ){
            //console.log(id+'tes');
            $("#"+id).click();
        }
        e.stopImmediatePropagation();
    });
});