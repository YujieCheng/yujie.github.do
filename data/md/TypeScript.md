2017年9月18日

#TypeScript入门(一)

TeypeScript 是 Javascript 的超集（超集的意思就是 Javascript 是它的子集），它可以编译成纯的 Javascript 。

>[TypeScript 官网传送门](https://www.tslang.cn/)

TypeScript 为javascript添加了许多的语言特性，使得javascript更像一个高级的编程语言,有着高级语言才有的严格的语法，严格的数据类型，还添加了诸如枚举 泛型等高级的数据类型。但在它的官网上有这么一句话，说的有点遮遮掩掩。

> TypeScript 可以在任何浏览器、任何计算机和任何操作系统上运行

注意： TypeScript 不是 Javascript ,它必须经过编译成 Javascript 才可以在浏览器上运行。

## 数据类型

### 布尔值 boolean

最基本的类型就是true/false,在TypeScript中是如下定义的：

<pre><code>
let isDone: boolean = false;
</code></pre>

### 数字类型 number

TypeScript 和 Javascript 一样，所有的数字都是浮点数。浮点数的类型是 number ，和js一样支持其他进制。

<pre><code>
let decLiteral: number = 6;
</code></pre>

### 字符串 string

通过上面两个例子，应该可以预料到string是怎么定义了的吧！没错，就是下面这么定义的：

<pre><code>
let str: string = 'hello world';
str='hello world';
</code></pre>

你还可以使用模板字符串，定义多行文本和内嵌表达式。用反引号'\`'(就是1旁边的)包围，变量或表达式用${ expr }嵌入，用'.'链接字符串。

<pre><code>
let name: string = 'Gene';
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.
I'll be ${ age + 1 } years old next month.`;
</code></pre>

### 数组 Array

数组定义有两种方式：

第一种：
<pre><code>
let list: number[]=[1,2,3];
let list: string[]=['a','b','c'];
</code></pre>

第二种方式是泛型，Array<元素类型>：
<pre><code>
let list: Array<number> = [1, 2, 3];
</code></pre>

### 元组 tuple

TypeScript 里面的元组类型可以定义一个数组，但是这个数组必须知道length和元素类型，但是个元素类型不必相同，如下：

<pre><code>
// Declare a tuple type 声明元组类型
let x: [string, number];
// Initialize it 初始化
x = ['hello', 10]; // OK
// Initialize it incorrectly 错误的赋值
x = [10, 'hello']; // Error
</code></pre>

当访问一个一直索引的元素，会得到正确的类型：

<pre><code>console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
</code></pre>

当访问一个越界的元素，会使用联合类型替代：

<pre><code>x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
x[6] = true; // Error, 布尔不是(string | number)类型
</code></pre>

联合类型是高级主题，我会在以后的文章里讨论它。

### 枚举 enum

enum类型是js标准类型的补充，和其他语言中的枚举类型一样

<pre><code>enum Color {Red,Green,Blue}
let c: Color=Color.Green;
</code></pre>

默认情况下，从0开始编号，和其他语言一样都是可以手动指定成员的值

<pre><code>enum Color {Red = 1, Green, Blue} //从1开始赋值
let c: Color = Color.Green;
</code></pre>

或者，全部都采用手动赋值：

<pre><code>enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
</code></pre>

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：

<pre><code>enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
alert(colorName);
</code></pre>

### Any

和传统的js相比，TypeScript 和js有的数据类型有很大的区别，而且在编译的过程中对类型有严格的检查，而在代码中的某个阶段我们并不知道某个值是什么类型，为了使ts通过检查，可以使用Any类型来标记这些变量。

<pre><code>let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
</code></pre>

对现有的代码进行改写的时候，Any类型十分有用，它可以允许你在移植原有的代码时跳过类型检查

当你只知道一部分数据的类型时，any类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

<pre><code>let list: any[] = [1, true, "free"];
list[1] = 100;
</code></pre>

当然元组也是可以这样定义的。

### 空类型 Void

void表示没有任何类型，当一个函数没有返回值时，通常返回的就是void

<pre><code>function fn():void{
	console.log('this is a message');
}</code></pre>

### Null 和 Undefined

在TypeScript 中，null 和 undefined 是所有类型的子类型，你可以将 null 和 undefined 可以赋值给所有的类型，

<pre><code>let u: undefined = undefined;
let n: null = null;
</code></pre>

### Never

这个类型有点抽象，有兴趣的可以去官网看看。这个类型没有什么好理解的，永远用不到。

<pre><code>//函数无限循环。
function test(){
	while(true){
	}
}

//error undefined 不是 never
function test1():never{
	return
}

//ok, void 类型只能被赋值 null 和 undefined
function test2():void{
	return
}

//error never 不能赋值给 void
function test2():void{
	return test();
}
</code></pre>

### 类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：

<pre><code>let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;</code></pre>

另一个为as语法：

<pre><code>let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;</code></pre>

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。

### 关于let

你可能已经注意到了，我们使用let关键字来代替大家所熟悉的JavaScript关键字var。 let关键字是JavaScript的一个新概念，TypeScript实现了它。 我们会在以后详细介绍它，很多常见的问题都可以通过使用 let来解决，所以尽可能地使用let来代替var吧。



























