<!-- -->

本章节将要学习的是接口，接口是什么，接口是实体提供给外界的一种抽象化概念。

## 第一个例子

<pre><code class='syntax brush-javascript'>interface Things {
  count: number;
  price: number;
}
function getTotlePrice(cart:Things):number{
	return cart.count*cart.price;
}
</code></pre>

TypeScript 也用了和其他语言中一样的声明接口的方式，在其他语言中，interface 是一个抽象类，没有任何实际的用途，不能直接用它，必须将它实现才能像正常类一样使用。它给我们提供的仅仅是告诉我们需要实现这个接口程序才能完成正常的工作

TypeScript 中的 interface 是告诉编译器 参数cart 必须要实现things接口。如果cart中没有things中定义的参数，那么编译器就会报错。在上面的例子中，参数cart必须包含count 和 price 两个属性，如果在调用getTotlePrice是传入的对象不包含这两个属性，编译器就会报错。

<pre><code class='syntax brush-java'>class Apple{
	count:number;
	price:number;
	constructor(count: number,price:number) {
        this.count = count;
        this.price = price;
    }
}
class Orange{
	price:number;
	constructor(price:number) {
        this.price = price;
    }
}
let p=new Apple(10,3.5);
let o=new Orange(4);

getTotlePrice(p);
getTotlePrice(o);//error Orange 类没有count 参数。
</code></pre>

## 接口的定义

我们继续用第一个例子来做说明，用interface关键字来定义接口。

<pre><code class='syntax brush-javascript'>interface Things {
  count: number;
  price: number;
}
</code></pre>

看起来来是不是很像字面js中字面量的定义，但是每个属性的分隔符是‘;’，而不是‘,’。那么我们能不能像Java中一样用 implement 来实现接口，创造一个实例呢。当然可以，但不是用关键字implement。

<pre><code class='syntax brush-javascript'>let apple:Things={
	count:5,
	price:3.5
};
apple.count
</code></pre>

## 可选参数

当然有时候你不确定你得到的参数里面是否有某个属性。这个时候你该怎么做呢，TypeScript 为你想到了这点，设置可选参数可以让参数对象中没有这个属性，而编译器不会报错。当然，在函数中需要进行检查，参数是否拥有这种属性,如果不做这种检查后果可能变得很严重。

<pre><code class='syntax brush-javascript'>interface things {
  count?: number;
  price: number;
}
function getTotlePrice(cart:things):number{
	if(cart.count)
		return cart.count*cart.price;
	return cart.price
}
</code></pre>

你看到了这个例子和前面的额例子的区别就是属性名后加了一个‘?’。

## 只读属性

一些对象属性只能在刚刚创建的时候对其进行赋值，你可以在属性前面添加限定名 readonly 来指定只读属性

<pre><code class='syntax brush-javascript'>let apple:Things={
	readonly count:5,
	price:3.5
};
apple.count=10//error 
</code></pre>

readonly 仅仅只能在属性中使用，不能修饰变量。const 和 let 只能用来修饰变量，而不是属性。

## 属性检查

TypeScript 对属性检查的规则很严格，比如在使用 接口字面量作为参数的类型时。

<pre><code class='syntax brush-javascript'>interface Things {
  count?: number;
  price: number;
}
function returnObj(apple:Things):Things{
	return apple;
}
returnObj({color:'red',price:3.5})//error 返回值
</code></pre>

虽然count 属性是可选属性所以返回值中没有这个属性也没有问题，但是返回值中有一个多余属性color，而在Things中并没有这个属性，TypeScript 就会报错。绕开这些检查非常简单。 最简便的方法是使用类型断言：

<pre><code class='syntax brush-javascript'>returnObj({color:'red',price:3.5} as Things);//error 返回值
</code></pre>

<b>上面的例子仅仅介绍了简单的类型，下面将介绍含有特殊类型的接口，如函数类型、类类型</b>

## 函数类型

含有函数类型的接口定义如下


<pre><code class='syntax brush-javascript'>interface Things {
  count: number;
  price: number;
  (count:number,price:number):number;
}
</code></pre>

这样仅仅是声明了一个匿名的函数作为属性，如果想实现这个接口，必须声明一个有函数名的函数

<pre><code class='syntax brush-javascript'>interface Things {
  count: number;
  price: number;
  getTotlePrice():number;
}
let apple:Tings={
	count:5,
	price:3.5,
	getTotlePrice:function(){
		return this.count*this.price
	}
}
</code></pre>

## 可索引类型

所谓的可索引类型就是可以通过arr[10],arr['name']这种方式取到值，这个就叫可索引类型。可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 

<pre><code class='syntax brush-javascript'>interface Things {
  count: number;
  price: number;
  getTotlePrice():number;
  [index:string]:any;//[索引签名：索引签名的类型]：返回值的类型
}
</code></pre>

属性的类型必须与索引的返回值类型一样，如果属性类型不一致可以用any。

<pre><code class='syntax brush-javascript'>interface Things {
  count: number;
  price: number;
  getTotlePrice():number;
  [index:string]:number;//error
}
</code></pre>

最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：
<pre><code class='syntax brush-javascript'>interface Things {
  count: number;
  price: number;
  getTotlePrice():number;
  readonly [index:string]:any;
}
</code></pre>

## 类类型

### 实现接口

TypeScript 的类也可以使用implements 关键字去实现接口，来强制一个类去符合某种约定。

<pre><code class='syntax brush-java'>class Apple implements Tings{
	count:number;
	price:number;
	constructor(count: number,price:number) {
        this.count = count;
        this.price = price;
    }
}
</code></pre>








































