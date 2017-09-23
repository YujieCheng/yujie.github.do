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
	getTotlePrice():number{
		return this.count*this.price;
	} ;
	constructor(count: number,price:number) {
        this.count = count;
        this.price = price;
    }
}
</code></pre>

这个例子就是定义了一个Apple类实现了接口Tings，所以必须在Apple类中声明count和price这两个属性和getTotlePrice这个，不然编译器就会报错。

### 类静态部分与实例部分的区别

当操作类和接口时，你要知道类是具有两个类型的，静态部分和实例部分。在java中用static 关键字去声明静态类、静态方法。同样的，在TypeScript 也是用static关键字来定义静态属性的。 你会注意到，当你用构造器去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

<pre><code class='syntax brush-java'>interface FruitsConstructor{
	new (count:number,price:number);
} 
class Apple implements FruitsConstructor{
	createTime:Date;
	constructor(count: number, price: number) { }
}
</code></pre>

因为类在实现一个接口的过程中，只会去检查实例部分,静态部分并不会去检查,constructor是类的静态部分，所以TypeScript 不对其进行检查。

因此，我们应该直接去操作类的静态属性。

<pre><code class='syntax brush-java'>interface FruitsConstructor{
	new (count:number,price:number);
} 
//定义一个构造器函数，该函数指定了两个参数，如果某个类实现了这个接口，
//那么他的构造函数必须含有两个参数。
interface Fruits{
	count:number;
	price:number;
} 
function createFruits (fruit:FruitsConstructor,count:number,price:number):Fruits{
	return new fruit(count,price);
}
class Banana implements Fruits {
	count:number;
	price:number;
	color:'yellow';
	constructor(c:number,p:number){};
}
let f=createFruits(Banana,5,2.5);
</code></pre>

这个确实很难理解 new 一个函数，简单的理解就是 FruitsConstructor 接口定义了实现这个接口的类的构造函数的参数。这部分的内容，计划在以后的章节中再提。

## 继承接口

和类一样，接口也可以被继承

<pre><code class='syntax brush-java'>interface Fruits{
	count:number;
	price:number;
} 
interface Apple extends Fruits {
	color:string;
}
</code></pre>

一个接口可以继承多个接口，组成一个合成接口。

## 接口继承 类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。 

<pre><code class='syntax brush-java'>class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {

}

// 错误：“Image”类型缺少“state”属性。
class Image implements SelectableControl {
    select() { }
}

class Location {

}
</code></pre>





































