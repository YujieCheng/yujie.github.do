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

在js中，this的使用就好比一场成年礼由于TypeScript是javascript的超集,TypeScript 也需要弄清this的工作机制，并且当有bug的时候能够找到错误所在。Typescript的编译器可以告诉你错误使用this的地方。

### this 和箭头函数

我们先来看一个例子：

<pre><code class='syntax brush-javascript'>let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
</code></pre>

这里我们定义一个字面量，我们知道 createCardPicker() 中 this 指向调用它对象，就是 this 指向 deck 对象，但是他返回函数中的this可不指向deck 你在nodejs中运行这段代码，会出现 TypeErrot 的错误。这里的 this 指向了 windows 对象，虽然node中没有windows对象，但是还是有一个全局对象，严格模式下this指向undefined。

为了解决这个问题我们可以在函数被返回时就绑定正确的this这样的话，无论以后怎么使用，它都会指向deck对象，我们需要用到es6中的箭头函数，箭头函数能保存函数创建时的 this 值，而不是调用时的值。

<pre><code class='syntax brush-javascript'>let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
</code></pre>

如果你给编译器设置了--noImplicitThis标记，TypeScript会警告你犯了一个错误。 它会指出 this.suits[pickedSuit]里的this的类型为any。

### this参数

如上面结尾提出的，单纯用箭头表达式并不能完美的解决所有问题，this.suits[pickedSuit]的类型依旧为any。 这是因为 this来自对象字面量里的函数表达式。 修改的方法是，提供一个显式的 this参数。 this参数是个假的参数，它出现在参数列表的最前面：

让我们往例子里添加一些接口，Card 和 Deck，让类型重用能够变得清晰简单些：

<pre><code class='syntax brush-javascript'>interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
</code></pre>

### this参数在回调函数里

this 这一块的内容比较复杂，我自己也不能完全理解，所以，需要将等到之后开发的过程中用到了这个内容后再写一篇关于这个的文章。

## 函数重载

js本来就是动态函数，所以不同参数的不同返回值在js中很常见。

<pre><code class='syntax brush-javascript'>function add(a:number,b:number):number;
function add(a:{x:number,y:number}):number;
function add(a):any{
	conosle.log(a.x+a.y);
}
add(10,15)
add({x:10,y:2})
</code></pre>

为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。