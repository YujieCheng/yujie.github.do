$(function(){
	$.get({
		dataType:'json',
		contentType:'application/json',
		url:'../data/info/contact.json',
		success:function(d){
			var vm=new Vue({
				el:"#articleList",
				data:{
					"search":'',
					"article":d
				},
				filters:{
					search:function(str){
						console.log(str)
						var re=new RegExp(this.search.value)
						if(re.test(str))
							return str
						return ''
					}
				}
			});
			$('body').show();
		}
	})
})
function localSearch(){
	
}