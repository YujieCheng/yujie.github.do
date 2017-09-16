<!-- toc -->

<!-- reuirejs -->

异步模块定义（AMD)的API指定了一种定义模块的规范，使得模块及其依赖关系可以被异步加载。浏览器的同步加载导致了性能、可用性、调试和跨域访问问题，而AMD规范就能解决这些问题，使得浏览器的可以异步加载。

# API规范 #

## define()函数 ##

该规范定义了可用作自由变量或全局变量的单个函数“define”。功能的签名：
<pre><code class='syntax brush-javascript'>
    define(id?,dependencies?,factory);
</code></pre>

### id ###

第一个参数id是一个字符串,它指定要定义的模块的id。此参数是可选的，如果不存在，则模块id默认为加载程序请求给定响应脚本的模块的ID。当存在时，模块id必须是“top-level”或绝对id（不允许使用相对ids）。

### 模块id的格式

模块ID可用于标识正在定义的模块，并且它们也用于依赖性数组参数。AMD中的模块ID是CommonJS模块标识符允许的超集。从该页面引用：

* 模块标识符是由正斜杠分隔的“术语”字符串。
* 术语必须是camelCase标识符，“。”或“..”。
* 模块标识符可能没有类似“.js”的文件扩展名。
* 模块标识符可以是“相对”或“顶级”。如果第一项是“”，则模块标识符为“相对”。要么 ”..”。
* 顶级标识符从概念模块名称空间根目录中解析出来。
* 相对标识符相对于其中写入和调用“require”的模块的标识符来解析。

上面引用的CommonJS模块id属性通常用于JavaScript模块。

相对模块ID分辨率示例：

* 如果模块"a/b/c"请求"../d"，则解析为"a/d"
* 如果模块"a/b/c"请求"./e"，则解析为"a/b/e"
如果在AMD实现，支持[插件加载器(Loader-Plugins)](https://github.com/amdjs/amdjs-api/wiki/%E5%8A%A0%E8%BD%BD%E5%99%A8%E6%8F%92%E4%BB%B6%28Loader-Plugins%29) ，那么“！” 用于将加载程序插件的模块ID与插件的资源ID分开。由于插件资源ids可以是非常自由的形式，因此大多数字符应该被允许用于插件资源ids。

### 依赖

第二个参数依赖关系是模块id的数组文字，它是被定义的模块所需的依赖关系。必须在执行模块工厂函数之前解决依赖关系，并将解析的值作为参数传递给工厂函数，其中参数位置与依赖关系数组中的索引相对应。

依赖关系ID可以是相对ids，并且应该相对于被定义的模块来解决。换句话说，相对ids是相对于模块的id解析的，而不是找到模块的id的路径。

此规范定义了具有不同分辨率的三个特殊依赖名称。如果依赖列表中出现“require”，“exports”或“module”的值，则该参数应解析为由CommonJS模块规范定义的相应的可变变量。

dependencies参数是可选的。如果省略，则应默认为[“require”，“exports”，“module”]。但是，如果工厂功能的arity（length属性）小于3，则加载程序可以选择只调用与函数的arity或length相对应的参数数。

### factory

第三个参数factory，是一个应该执行的函数来实例化模块或一个对象。如果工厂是一个功能，它只能执行一次。如果factory参数是一个对象，则该对象应该被分配为模块的导出值。

如果工厂函数返回值（对象，函数或强制为true的任何值），那么该值应该被分配为模块的导出值。

简化的CommonJS包装

如果省略了依赖参数，则模块加载程序可以选择以require语句的形式扫描工厂函数的依赖关系（字面上以require（“module-id”）的形式）。第一个参数必须字面上被命名为要求这个工作。

在某些情况下，模块加载程序可能会选择不扫描依赖关系，这是由于代码大小的限制或缺少toString对功能的支持（Opera Mobile已知缺少toString对函数的支持）。

如果存在依赖参数，则模块加载程序不应在工厂函数内扫描依赖项。

## define.amd属性

为了允许一个清晰的指示符，全局定义函数（根据脚本src浏览器加载的需要）符合AMD API，任何全局定义函数应该有一个名为“amd”的属性，其值是一个对象。这有助于避免与可能定义不符合AMD API的define（）函数的任何其他现有JavaScript代码的冲突。

目前没有指定define.amd对象中的属性。它可以被实现者使用，他们希望通知实现支持的基本API之外的其他功能。

存在具有对象值的define.amd属性表示符合此API。如果有其他版本的API，它可能会定义另一个属性，如define.amd2，以指示符合该版本的API的实现。

可以为允许在环境中加载模块的多个版本的实现进行定义的示例：
<pre><code class='syntax brush-javascript'>define.amd = {
      multiversion: true
    };</pre></code>
最低定义：
<pre><code class='syntax brush-javascript'>define.amd = {};</pre></code>

## 一次运输多个模块

可以在单个脚本中进行多个定义调用。定义调用的顺序应该不重要。早期的模块定义可以指定稍后在同一脚本中定义的依赖关系。模块加载器有责任延迟加载未解决的依赖关系，直到整个脚本被加载以防止不必要的请求。

# 例子

## 使用require和export

设置ID为“alpha”的模块，它使用require，exports和ID为“beta”的模块：

<pre><code class='syntax brush-javascript'> define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
       exports.verb = function() {
           return beta.verb();
           //Or:
           return require("beta").verb();
       }
   });</pre></code>
返回对象字面值的匿名模块：
<pre><code class='syntax brush-javascript'>define(["alpha"], function (alpha) {
       return {
         verb: function(){
           return alpha.verb() + 2;
         }
       };
   });</pre></code>
一个无依赖关系的模块可以定义直接对象字面值：
<pre><code class='syntax brush-javascript'>define({
     add: function(x, y){
       return x + y;
     }
   });</pre></code>
使用简化的CommonJS包装定义的模块：
<pre><code class='syntax brush-javascript'>define(function (require, exports, module) {
     var a = require('a'),
         b = require('b');

     exports.action = function () {};
   });</pre></code>
 
## 全局变量

本规范保留用于实现本规范的全局变量“define”，即包元数据异步定义API，并保留给其他未来的CommonJS API。模块加载程序不应该向此函数添加其他方法或属性。

本规范保留了模块装载机使用的全局变量“require”。模块加载器可以自由使用这个全局变量，因为它们是合适的。他们可以使用该变量，并根据模块加载器特定功能的需要向其添加任何属性或函数。他们也可以选择不使用“需求”。

## 使用说明

建议使用“define（...）”的文字形式定义调用，以便使用静态分析工具（如构建工具）正常工作。

## 与CommonJS的关系

该API的一个版本作为传输格式在CommonJS维基上开始，作为Modules Transport / C，但是随着时间的推移，它也包含一个模块定义API。关于推荐这个API作为模块定义API的CommonJS列表中未达成共识。API已转移到自己的wiki和讨论组。

只要CommonJS模块不使用计算的，同步的require（''）调用，AMD就可以用作CommonJS模块的传输格式。使用计算的synchronized require（''）代码的CommonJS代码可以转换为使用大多数AMD加载器支持的回调式需求。