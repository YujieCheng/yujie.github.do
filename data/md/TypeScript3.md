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





























