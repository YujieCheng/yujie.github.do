
$(function(){
	$.get("../data/requirejs.json",function(d){
		console.log(d);
		var vm=new Vue({
			el:"#content",
			data:{
				"article":d
			}
		});
	})		
})