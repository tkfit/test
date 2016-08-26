var tkf = $.extend({}, tkf);/* 定义全局对象，类似于命名空间或包的作用 */


/**
 * @requires jQuery,Messenger
 * @param typeFlag true：info false：error
 * @param msg 提示信息
 * 
 */
tkf.messagerShow = function(typeFlag, msg) {
	return Messenger({ 'parentLocations': ['#main-container'] }).post({
        message: msg== "" ? '您的网络无法访问到服务器，请稍后再试！' : msg,
        type: typeFlag ? 'info' : 'error',
        showCloseButton: true
    });
};

///--------------------------改变jQuery的AJAX默认属性和方法---------------------------------///
$.ajaxSetup({ //全局的ajax访问，处理ajax清求时sesion超时  
	cache: false,
	contentType:"application/x-www-form-urlencoded;charset=utf-8",  
    complete:function(XMLHttpRequest,textStatus){  
        //通过XMLHttpRequest取得响应头，sessionstatus，  
        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");   
        if(sessionstatus=="timeout"){  
        	//如果超时就处理 ，指定要跳转的页面  
        	if(XMLHttpRequest.getResponseHeader("loginPath")){  
                window.location.replace(XMLHttpRequest.getResponseHeader("loginPath"));  
            }else{  
                alert("您已经太长时间没有操作,请刷新页面。");  
            }  
        }  
    }  
});

$(document).ajaxStart(function() {
    //$("#page-loading").show();
    $('.loading_large').show();
    //$(".loading_text").html('<i class="ico-refresh"></i>数据导出中，请稍后...');
});
$(document).ajaxStop(function() {
    $("form").submit(function() {
        $(":submit", this).attr("disabled", "disabled");
    });
    $(":submit").attr("disabled", false);

    //$("#page-loading").hide();
    $('.loading_large').fadeOut();
    $(".loading_text").html('<i class="ico-refresh"></i>数据处理中，请稍后...');
});

$(document).ajaxError(function(event, request) {
	$('.loading_large').hide();
	tkf.messagerShow(false, request.responseText);
});

$(document).ajaxComplete(function(event, xhr, settings) {  
    if(xhr.getResponseHeader("sessionstatus")=="timeout"){  
    	if(xhr.getResponseHeader("loginPath")){  
            window.location.replace(xhr.getResponseHeader("loginPath"));  
        }else{  
            alert("您已经太长时间没有操作,请刷新页面。");  
        }  
    }  
});   
///----------------------------改变jQuery的AJAX默认属性和方法 end-------------------------------///
