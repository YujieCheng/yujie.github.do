<!-- -->

这几年一直写js代码都忘记了c语言中怎么声明变量了，当然也忘记了变量的各种定义域，渐渐习惯了js中诡异的定义域。如果一直写js代码倒是没有任何问题，但是一旦去写别的代码，就会出现很多问题。 TypeScript 中引入 let 关键字，有着严格的作用域规范，当然和es6 中的let的用法一样的。

## var 声明变量

通常我们都是通过 var 关键字定义 Javascript 变量

var i=10;

这样的声明并且赋值是很容易理解的。

### var变量的作用域

当 var 用在函数中会有什么表现呢？闭包就是变量作用域所产生的一种特殊的结构，下面看看这个例子

function fn1(){
	var i=1;
	return function(){
		console.log(i)
	}
}

var fn2=fn1();//1

fn2 就是一个闭包，虽然fn1已经执行完了，但是我们依旧可以用fn2来访问里面的变量。

function fn1(bool){
	if(bool)
		var x=10;
	return 10;
}

fn1(true)//10

我们在if语句里面定义的x变量，但是我们在if语句外面依旧可以访问。对非jser们会感觉到很怪异，但是对于jser们司空见惯了。var 声明的变量只有函数内部的作义域，而没有 块级作用域。所以就会出现上面例子中的情况。

var 声明变量可以重复声明，而不会报错。

function print(){
	for(var i=0;i<10;i++)
		for(var i=0;i<10;i++)
			console.log(i);
}

一眼看去它是要你打印10次 (0...9),但是它仅仅打印了一遍。由上个例子可以知道，i变量的作用域是整个print函数，所以当内部循环结束时，i的值已经自增到了10，已经不满足外层循环的循环标志了。所以就打印了一遍就结束了两个循环。

由上面的闭包的例子和作用域的例子下面的例子就很好理解了

function print(){
	for (var i = 0; i < 10; i++) {
		setTimeout(function() { console.log(i); }, 100 * i);
	}
}

猜猜这个print函数会打印怎样的数据呢？没错这个函数会打印10个10，而不是打印 (0...9);

我们通常用立即执行函数表达式来捕获每次迭代时 i 的值

function print(){
	for (var i = 0; i < 10; i++) {
		(function (i){
			setTimeout(function() { console.log(i); }, 100 * i);)
		)(i)
	}
}

## let 声明变量

在es6中，已经支持let和const关键字了。let 就是用来定义块级变量的

function fn1(bool){
	if(bool)
		let x=10;
	return x; 
};

fn1(true);//undefined 和上面的函数作用域对比

let和var 的区别就是在这个作用域上，let 也可以声明全局变量，直接在js文件 top-level 上用let定义。

同样的，在switch,try catch,for等都是块级作用域，并且let关键字不允许同一个level上重复声明

var t=0;

let t=0;//error

let t=0;
let t=1;//error

### 屏蔽

我们来用let重写上面的作用域的例子

function print(){
	for(let i=0;i<10;i++)
		for(let i=0;i<10;i++)
			console.log(i);
}

这会得到正确的结果。

















