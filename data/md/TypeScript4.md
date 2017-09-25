函数是每一种语言都有的一种数据结构，在js中函数帮助你实现抽象层、模拟类、模块化。在 TypeScript 中，虽然已经支持了类，命名空间和模块，但函数仍然是主要定义行为的地方。 TypeScript 为javascript函数添加了额外的功能，让我们更容易的使用。

## 函数

和js一样，ts 既可以创建有名称的函数，也可以创建匿名函数。你可以随意选择适合应用程序的方式，不论你是用来定义一系列API 还是只调用一次的函数。下面是js函数的例子

<pre><code class='syntax brush-javascript'>function add(a,b){
	console.log(a+b);
}
function(message){
	console.log(message);
}
</code></pre>

我们在之前的变量声明那篇文章中说过 js 有着奇怪的作用域，比如函数可以使用函数以外的变量。这种情况可以称为捕获变量，但是这种情况在其他的语言中是很匪夷所思的，但在js中这样的用法，很有用。

<pre><code class='syntax brush-javascript'>var i=10;
var j=10,
	k=10
function add(a,b){
	console.log(a+b+k);
}
add(x+y);
</code></pre>

## 函数类型

TypeScript 与 js 定义函数的区别就是，TypeScript 有了返回类型，和参数类型。如下

<pre><code class='syntax brush-javascript'>function add(a:number,b:number):number{
	retrun a+b;
}
</code></pre>

另一种定义的方法，就是用赋值的方法来做的，先声明一个函数类型如下

<pre><code class='syntax brush-javascript'>let add:(x:number,y:number)=>number;
</code></pre>

然后再对他进行赋值

<pre><code class='syntax brush-javascript'>add=function(a:number,b:number):number{
	retrun a+b;
}
</code></pre>

也可以这样去做，他可以自动识别类型

<pre><code class='syntax brush-javascript'>let add=function(a:number,b:number):number{
	retrun a+b;
}
</code></pre>

## 可选参数和默认参数

在js中，所有的参数都是可选的，而在TypeScript中，参数列表中的每一个参数都是必须的。如果调用函数时，参数少了或者多了，参数的类型不对，都会导致编译器报错。如下

<pre><code class='syntax brush-javascript'>let add=function(a:number,b:number):number{
	retrun a+b;
}
add(10);//error
add(10,25);//ok
add(10,25,35);//error
add('10','25');//error
</code></pre>

那么怎么使参数可选呢，我们之前说过接口属性的可选。这里也是一样只需要在函数声明是在参数列表中参数名后面加一个‘?’就行了。

<pre><code class='syntax brush-javascript'>let add=function(a:number,b?:number):number{
	if(b)
		retrun a+b;
	return a;
}
add(10);//ok
add(10,25);//ok
add(10,25,35);//error
add('10','25');//error
</code></pre>

注意可选参数和参数有位置的区别，就是可选参数必须在普通参数后面。

在 TypeScript 中没有传递的参数默认是undefined ，这个叫做默认初始化参数。当然我们也可以对某个参数设置初始值。这样你可以传这个参数也可以不传，如下：

<pre><code class='syntax brush-javascript'>let add=function(a:number,b=10):number{
	retrun a+b;
}
</code></pre>

## 剩余参数

在js 中你可以通过arguments来访问所有的参数，TypeScript 可以传入任意的参数吗？当然可以，方法如下：

<pre><code class='syntax brush-javascript'>let add=function(a:number,...b:number[]):number{
	let sum=a;
	b.forEach(function(v:number,i:number){
		sum+=v;
	})
	retrun sum;
}
console.log(add(1,2,3,4,5,6,7,8,9,10));//55
</code></pre>

剩余参数被认定为是同一种类型的参数，并且TypeScript将他们放到了一个数组中去了。后面如果访问剩余参数的话，需要像访问数组一样的去访问。

## this

在js中，this的使用就好比一场成年礼由于TypeScript是javascript的超集




















