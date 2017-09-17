$(function(){
	$.get("../data/info/contact.txt",function(d){
		var data=JSON.parse(d);
		console.log(data[0])
		var vm=new Vue({
			el:"#articleList",
			data:{
				"article":data
			}
		});
		$('body').show();
	})
})