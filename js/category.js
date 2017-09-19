$(function(){
	$.get("../data/info/contact.txt",function(d){
		var data=JSON.parse(d);
		console.log(data[0])
		var vm=new Vue({
			el:"#articleList",
			data:{
				"search":'',
				"article":data
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
	})
})
function localSearch(){
	
}