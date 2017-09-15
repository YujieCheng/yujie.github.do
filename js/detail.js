
$(function(){
	$.extend({
		getQueryString: function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null) return unescape(r[2]); return null; 
		}
	})
	var data=$.getQueryString("data");
	$.get("../data/info/"+data+".txt",function(d){
		console.log(d)
		var data=JSON.parse(d)
		console.log(data)
		$.get(data.content,function(d){
			data.content=d;
			var vm=new Vue({
				el:"#content",
				data:{
					"article":data
				}
			});
			jQuery.syntax({theme: 'paper', blockLayout: 'fixed'});
			$('a[href*=#],area[href*=#]').click(function() {  
				console.log(this.pathname)  
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {  
					var $target = $(this.hash);  
					$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');  
					if ($target.length) {  
						var targetOffset = $target.offset().top-50;  
						$('html,body').animate({  
									scrollTop: targetOffset  
								},  
								1000);  
						return false;  
					}  
				}  
			}); 
		});
		
	})
	
})