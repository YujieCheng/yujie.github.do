<!-- -->

这几年一直写js代码都忘记了c语言中怎么声明变量了，当然也忘记了变量的各种定义域，渐渐习惯了js中诡异的定义域。如果一直写js代码倒是没有任何问题，但是一旦去写别的代码，就会出现很多问题。 TypeScript 中引入 let 关键字，有着严格的作用域规范，当然和es6 中的let的用法一样的。

## var 声明变量

通常我们都是通过 var 关键字定义 Javascript 变量


<pre><code class='syntax brush-javascript'>var i=10;
</code></pre>

这样的声明并且赋值是很容易理解的。

### var变量的作用域

当 var 用在函数中会有什么表现呢？闭包就是变量作用域所产生的一种特殊的结构，下面看看这个例子


<pre><code class='syntax brush-javascript'>function fn1(){
	var i=1;
	return function(){
		console.log(i)
	}
}

var fn2=fn1();//1
</code></pre>

fn2 就是一个闭包，虽然fn1已经执行完了，但是我们依旧可以用fn2来访问里面的变量。

<pre><code class='syntax brush-javascript'>function fn1(bool){
	if(bool)
		var x=10;
	return 10;
}

fn1(true)//10
</code></pre>

我们在if语句里面定义的x变量，但是我们在if语句外面依旧可以访问。对非jser们会感觉到很怪异，但是对于jser们司空见惯了。var 声明的变量只有函数内部的作义域，而没有 块级作用域。所以就会出现上面例子中的情况。

var 声明变量可以重复声明，而不会报错。

<pre><code class='syntax brush-javascript'>function print(){
	for(var i=0;i<10;i++)
		for(var i=0;i<10;i++)
			console.log(i);
}
</code></pre>

一眼看去它是要你打印10次 (0...9),但是它仅仅打印了一遍。由上个例子可以知道，i变量的作用域是整个print函数，所以当内部循环结束时，i的值已经自增到了10，已经不满足外层循环的循环标志了。所以就打印了一遍就结束了两个循环。

由上面的闭包的例子和作用域的例子下面的例子就很好理解了

<pre><code class='syntax brush-javascript'>function print(){
	for (var i = 0; i < 10; i++) {
		setTimeout(function() { console.log(i); }, 100 * i);
	}
}
</code></pre>

猜猜这个print函数会打印怎样的数据呢？没错这个函数会打印10个10，而不是打印 (0...9);

我们通常用立即执行函数表达式来捕获每次迭代时 i 的值

<pre><code class='syntax brush-javascript'>function print(){
	for (var i = 0; i < 10; i++) {
		(function (i){
			setTimeout(function() { console.log(i); }, 100 * i);)
		)(i)
	}
}
</code></pre>

## let 声明变量

在es6中，已经支持let和const关键字了。let 就是用来定义块级变量的

<pre><code class='syntax brush-javascript'>function fn1(bool){
	if(bool)
		let x=10;
	return x; 
};

fn1(true);//undefined 和上面的函数作用域对比
</code></pre>

let和var 的区别就是在这个作用域上，let 也可以声明全局变量，直接在js文件 top-level 上用let定义。

同样的，在switch,try catch,for等都是块级作用域，并且let关键字不允许同一个level上重复声明

<pre><code class='syntax brush-javascript'>var t=0;

let t=0;//error

let t=0;
let t=1;//error
</code></pre>

### 屏蔽

我们来用let重写上面的作用域的例子

<pre><code class='syntax brush-javascript'>function print(){
	for(let i=0;i<10;i++)
		for(let i=0;i<10;i++)
			console.log(i);
}
</code></pre>

这会得到正确的结果。在TypeScript中，这样就称为屏蔽，在其他高级语言中，是不允许这样重复声明的。 TypeSript 实现了可以重复声明而不会出现和 var 一样的情况，这种情况我们称之为屏蔽，内部循环中的i屏蔽了外层i的值，但是不建议使用屏蔽，屏蔽有些时候会让你的代码难以理解，和难以维护。在一般的情况下你需要重新定义一个新的变量，如j.

<pre><code class='syntax brush-javascript'>function print(){
	for(let i=0;i<10;i++)
		for(let j=0;j<10;i++)
			console.log(j);
}
</code></pre>

## const声明

const声明是声明变量的另一种方式，const 和 let 有着相同的作用域，但是这两者之间有着区别，const 不能重复赋值

<pre><code class='syntax brush-javascript'>const KEYCODE=13;
KEYCODE=12;//error 不能重复赋值
</code></pre>
















