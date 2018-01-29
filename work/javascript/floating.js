// JavaScript Document
(function ($){
	$.fn.floating = function (method) {
		var initialize = {};
		var methods = {
			init: function(){
				methods.destroy.apply(this);
				methods.update.apply(this,initialize);
			},
			destroy: function (){
				$(this).find(".parts-floating").remove();
			},
			update: function(obj){
				var $html = $("<div/>");
				var $ul = $("<ul/>");
				methods.destroy.apply(this);
				if(initialize.state || initialize.moveState){
					$html.addClass("parts-floating");
					$html.attr("data-position",initialize.position);
					$html.attr("data-theme",initialize.theme);
					$html.attr("data-size",initialize.size);
					$html.attr("data-state",initialize.state);
					$html.attr("data-moveState",initialize.moveState);
					$.each(initialize.account,function(index,obj){
						var $li_html = $('<li/>');
						if(obj.url){
							$li_html.append('<a href="' + obj.url + '" target="_blank"><span class="iconfont"></span></a>');
						}else{
							$li_html.append('<span class="iconfont"></span>');
						}
						if(obj.test){
							$li_html.attr("title",obj.test);
						}
						if(obj.tip){
							var url=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
							var objExp=new RegExp(url);
							if(objExp.test(obj.tip)){
								url = "<img src=\"" + obj.tip + "\">";
							}else{
								url = obj.tip;
							}
							$li_html.append('<div class="tooltip parts-li-tip"><div class="tooltip-inner">' + url + '</div></div>')
						}
						$li_html.attr("data-type",obj.type);
						if(obj.type == "Top"){
							$li_html.click(function(){
								$('body,html,nav.top_nav ~ .section').animate({ scrollTop:0},500);
							})
						}
						$li_html.appendTo($ul);
					});
					$.each(initialize.tip,function(name,obj){
						$ul.find(".parts-li-tip .tooltip-inner").css(name,obj);
					})
					$ul.appendTo($html);
					$(this).append($html);
				}
			}
			
		}
		if (methods[method]) {
			return methods[method].apply(this,Array.prototype.slice.call(arguments, 1));
		}else if (typeof method === 'object' || !method) {
			initialize =  $.extend(initialize , method);
			return methods.init.apply(this,initialize);
		}
	};
	   $(document).ready(function() {
        $("body").floating({
            "theme": "panel_theme_fillet_Blacktheme",
            "state": true,
            "moveState": true,
            "size": "sm",
            "position": "right-center",
            "tip": {
                "background-color": "#03A9F4",
                "color": "#fff"
            },
            "account": [{
                "type": "Viber",
                "tip": "(+86) 15254985342",
                "text": "(+86) 15254985342",
                "url": ""
            },{
                "type": "QQ",
                "tip": "QQ：1418606308",
                "text": "1418606308",
                "url": "http://wpa.qq.com/msgrd?v=3&uin=1418606308&site=qq&menu=yes"
            },{
                "type": "QRcode",
                "tip": "http://jq22com.qiniudn.com/12.png",
                "text": "二维码",
                "url": null
            }, {
                "type": "Top",
                "tip": "回到顶部",
                "text": null,
                "url": null
            }]
        });
    })
})(jQuery);