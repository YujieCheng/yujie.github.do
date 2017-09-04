
$(function(){
	$.get("../data/requirejs.json",function(d){
		var vm=new Vue({
			el:"#content",
			data:{
				"article":d
			}
		});
	})		
})