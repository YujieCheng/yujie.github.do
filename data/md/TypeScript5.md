接下来我们介绍一个非常重要的类型，他可以帮助我们创建一个良好的组建。组建不仅仅能支持当前类型，而且支持未来的类型。在JAVA中，可以用泛型来创建可重用的组建一个组建可以支持多种数据类型，你可以使用自己定义的数据类型，来作为函数参数的类型，list的类型，如下是java中的例子
<pre><code class='syntax brush-java'>AyyayList<String> a = new ArrayList<String>();  
ArrayList b = new ArrayList();  
Class c1 = a.getClass();  
Class c2 = b.getClass();  
System.out.println(a == b); //true  
</code></pre>

这里不多做介绍，这里的变量 a 的类型是 ArrayList 泛型限定了 a 中可以存储 string 类型的数据。这里或许你不太懂，但是没有关系，接着看下去就会懂了。

## 泛型的定义

下面来创建第一个使用泛型的例子：echo 他会返回任何输入的数据

<pre><code class='syntax brush-java'>function echo<T>(arg:T):T{
	return arg;
}
let str=echo<string>("string")//str 是string类型的。
let num=echo<number>(12)//num 是 number 类型的。
</code></pre>

这里的 T 叫类型变量，他是一种特殊的变量，只用于表示类型，而不是值。

现在我们先看一下这个函数的结构，除了多了一个类型变量，和一个"<>"之外，其他部分和一般的函数没有任何区别，接下来我们就要了解下什么是类型变量。

所谓的类型变量就是用来约束输入的变量和返回的变量的类型。这样保证了我们传入的类型和返回的类型是一致的。接下来展示传统的方法。

<pre><code class='syntax brush-javascript'>//第一个例子
function echo(arg:string):string{
	return arg;
}
let str=echo("string");//str 是string类型的。
let num=echo(12);//error, arg必须是string类型的。 

//第二个例子
function echo(arg:any):any{
	return arg;
}
let str=echo("string");//str 是any类型的
let num=echo(12);//num 是any类型的
</code></pre>

在上面的第一个例子中，我们定义的函数echo只能接受一个string类型的参数，而不能接受number类型的参数。这就是我们为什么用泛型的原因了，看我们泛型的例子，无论你的参数是string 还是number 都是可以的。但是为什么不用any类型呢？就像第二个例子一样，但是我们可以看到结果，结果是所有的返回值都变成了any类型了。这并不是我们想要的，我们想要的是明确的类型，在第二个例子中，如果你想print str的length会怎么样呢？答案是编译器报错，因为any没有length属性。

## 泛型变量

泛型在运行之前都是不知道这个参数是什么变量的，所以在泛型内部，要将所有传入的参数看作是所有类型。

<pre><code class='syntax brush-java'>function echo<T>(arg:T):T{
	console.log(arg.length);//error 函数不知道你传入的什么类型，所以不确定你这个是不是有这个属性。
	return arg;
}
let str=echo<string>("string")//str 是string类型的。
let num=echo<number>(12)//num 是 number 类型的。
</code></pre>

因为你传入的参数的类型是不确定的，所以不能使用一些类型特有的属性。

<pre><code class='syntax brush-java'>function echo<T>(arg:Array<T>):Array<T>{
	console.log(arg.length);//error 函数不知道你传入的什么类型，所以不确定你这个是不是有这个属性。
	return arg;
}
</code></pre>

这样就是正确的了因为你指定了参数的类型是数组类型，而数组是有length的。所以编译器在做类型判断的时候，没有报错，因为array有length属性。

## 泛型类型

我们先来看看泛型函数之间的赋值过程。

<pre><code class='syntax brush-java'>function echo<T>(arg:T):T{
	return arg;
}

let myEcho1:<T>(arg:T)=> T = echo;
let myEcho2:{<T>(arg:T):T}=echo;
let myEcho3=echo;//不指明类型也是可以的
</code></pre>

我们知道，接口是可以描述js 中一切的对象，当然也包括字面量对象，我们可以将上面第二种赋值的方法改造一下，如下

<pre><code class='syntax brush-java'>interface echoFn{
	<T>(arg:T):T;
}
function echo<T>(arg:T):T{
	return arg;
}
let myEcho2:echoFn=echo;
</code></pre>

这样写起来很酷吧。我们还可能将泛型的参数当成整个接口的参数，这样我们就知道具体使用那个泛型了，例子如下

<pre><code class='syntax brush-java'>interface echoFn<T>{
	(arg:T):T;
}
function echo<T>(arg:T):T{
	return arg;
}
let myEcho2:echoFn<string>=echo;
</code></pre>

注意这种将泛型接口当成整个接口参数的方式，myEcho 的参数类型改成了string 这样限定了函数只能接收string参数。

除了泛型接口外，我们还可以创建泛型类，注意，无法创建泛型枚举和泛型命名空间。


## 泛型类

泛型类看上去和泛型接口差不多，我们来看下面的例子

<pre><code class='syntax brush-java'>class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
</code></pre>

这个例子很清晰的表述本节要讲的内容，当然你也可以不选择number类型，注意，类的静态部分不能使用这个泛型类型

## 泛型约束

前面的例子中说过，用类型变量，不确定参数是什么类型，不能使用length等属性，但是如果需要使用怎么办？如下：

<pre><code class='syntax brush-java'>class Fruits{
    count:number;
	price:number;
	constructor(a:number,b:number){
		this.count=a;
		this.price=b;
	}
}
function getTotlePrice<T>(arg:T):number{
	return arg.count*arg.price;//很明显这样的方式是会报错的。
}

let f=new Fruits(10,3.5)
let t=getTotlePrice<Fruits>(f) 
</code></pre>

我们用接口来定义约束，用下面的方法

<pre><code class='syntax brush-java'>interface Fruits{
	count:number;	
	price:number;	
}
class Apple implements Fruits{
    count:number;
	price:number;
	constructor(a:number,b:number){
		this.count=a;
		this.price=b;
	}
}
function getTotlePrice<T extends Fruits>(arg:T):number{
	return arg.count*arg.price;//很明显这样的方式是会报错的。
}

let f=new Apple(10,3.5)
let t=getTotlePrice<Fruits>(f) 
</code></pre>

这样的话，定义了泛型的约束，这个泛型将不再是任何类型了，而是所有包含count和price属性的对象。

关于泛型就讲到这里，想了解跟多请访问：

>[TypeScript 官网传送门](http://www.typescriptlang.org/)

























