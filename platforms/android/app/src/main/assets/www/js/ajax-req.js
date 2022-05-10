function AJAXreq(method,url,data){
    var contentType ="application/x-www-form-urlencoded; charset=utf-8";
    if(window.XDomainRequest) contentType = "text/plain";
    app.modal.show();
    
    return JSON.parse($.ajax({
        type: method,
        url : url,
        data: data,
        dataType:'json',
        global: false,
        async: false, 
        contentType:contentType, 
        beforeSend: function(xhr){
            app.modal.show();
        },
        success:function(msg){
        },
        error: function(error){
            app.modal.hide();
        }, 
        complete: function(xhr,status){
            
            app.modal.hide();
        }
    }).responseText); 
}