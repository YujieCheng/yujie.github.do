
$(function(){
	$.get("../data/requirejs.json",function(d){
		var vm=new Vue({
			el:"#articleList",
			data:{
				"article":d
			}
		});
	})		
})