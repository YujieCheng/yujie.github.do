在面向对象的编程中，我们必不可少的一中数据类型就是类类型，类是一种用户自定义类型。类是面向对象编程的一种思想，世界中任何事物都可以用类来描述。传统的js是用函数和基于原型链继承的方式来构建可重用组件，在es6中js也引入了class关键字，来定义类，但是我们不能过早的使用es6标准，因为大部分的浏览器不能完全支持es6。TypeScript给你提供了class方式定义类，经过编译后形成的js是用函数实现的，所以可以在所有主流的平台上运行。

## 类的定义

<pre><code class='syntax brush-java'>class Fruits {
	color:string;
	count:number;
	price:number;
	constructor(c:string,count:number,price:number){
		this.color=c;
		this.count=count;
		this.price=price;
	}
	getTotlePrice(){
		return this.count*this.price;
	}
}
let a=new Fruits('red',10,3.5);
</code></pre>

上面的例子定义了一个 Fruits 类，类中有五个成员，含有三个属性，一个方法，一个构造方法。有过面向对象编程的小伙伴们对这些代码应该相当熟悉。

## 类的继承

既然有了类，那不免要提到类的继承，和其他的语言差不多的使用方法

<pre><code class='syntax brush-java'>class Fruits {
	color:string;
	count:number;
	price:number;
	constructor(c:string,count:number,price:number){
		this.color=c;
		this.count=count;
		this.price=price;
	}
	getTotlePrice(){
		console.log('totle price:'+ this.count*this.price)
	}
}
class Apple extends Fruits{
	contructor(c:string,count:number,price:number){super(c,count,price)}
	getTotlePrice(){
		console.log('apple price'+ this.count*this.price)
	}
}
</code></pre>

Apple 继承了Fruits 类，Apple 必须调用父类的构造方法，因为他有构造函数。这个例子还演示了子类重写父类的方法。

## 公共，私有与受保护的修饰符

TypeScript 也有public,private,protected 这三个修饰符，下面分别介绍下。

<pre><code class='syntax brush-java'>
class Apple extends Fruits{
	private shape:string;
	protected owner:string;
	constructor(c:string,count:number,price:number){super(c,count,price)}
	public getTotlePrice(){
		console.log('apple price'+ this.count*this.price)
	}
	public setShape(n:string){
		this.shape=n;
	}
}
</code></pre>

### public

在类中，成员变量前面没有任何修饰符，那么默认是 public 。从字面意义上来看，public 就是公共的意思。可以任意访问，

<pre><code class='syntax brush-java'>new Apple('red',10,3.5).count;
</code></pre>

### private

被 private 修饰的成员变量，表示该成员变量只能在类内部访问，而不能在外部访问。

<pre><code class='syntax brush-java'>new Apple('red',10,3.5).shape;//error
new Apple('red',10,3.5).setShape('cricle')//ok
</code></pre>

### protected

protected在子类中依旧可以访问，其他的和private 一样。

### readonly

你可以使用readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

## 静态属性

静态属性是不需要实例化直接用类的名称就可以访问的成员变量。

<pre><code class='syntax brush-java'>class Apple extends Fruits{
	static shape:string;
	protected owner:string;
	constructor(c:string,count:number,price:number){super(c,count,price)}
	public getTotlePrice(){
		console.log('apple price'+ this.count*this.price)
	}
	public setShape(n:string){
		this.shape=n;
	}
}
</code></pre>

## 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

<pre><code class='syntax brush-java'>abstract class Fruits {
	abstract eat():void;
}
</code></pre>

抽象类中抽象方法不包含具体的实现方法，它的具体实现必须在派生类中实现，抽象方法的语法跟接口里的方法很想，不同的是抽象方法可以添加访问修饰符。当然抽象方法必须包含 abstract 关键字


<pre><code class='syntax brush-java'>abstract class Fruits {
	abstract private eat():void;
}
</code></pre>

上面就是关于Ts中类的定义的全部内容，当然关于类还有一些高级技巧，有兴趣的可以去官网上学习

>[TypeScript 官网传送门](http://www.typescriptlang.org/)