
$(function(){
	$.extend({
		getQueryString: function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r != null) return unescape(r[2]); return null; 
		}
	})
	var data=$.getQueryString("data");
	$.get("../data/"+data+".txt",function(d){
		console.log(d)
		var data=JSON.parse(d)
		var vm=new Vue({
			el:"#content",
			data:{
				"article":data
			}
		});
	})		
})