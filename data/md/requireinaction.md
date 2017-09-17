
# 概述

最近项目中使用过了requirejs，有点想法跟大家分享一下

requirejs在实际应用中有很多的好处，比如传统的映入js的方法是添加n多的script标签，如下：

<pre><code class='syntax brush-html'>
<script src="..."></script>
<script src="..."></script>
<script src="..."></script>
<script src="..."></script>
</code></pre>

这样的方式对于业务不是很复杂的项目是没有任何问题的，但是一旦业务复杂了，js文件应用多了，就不容易去管理，而requirejs的功能就体现了出来，作为一个js的模块加载器，可以异步的加载js文件，每个js按照之前文章中的define去定义，在主js文件中将该模块的路径定义了就可以很快的去引入js文件，不需要去修改html文件，这样也方便管理。接下来我们一步步去学习require中的Api，另外，我还会教大家一些实用的技巧，会让requirejs的使用变得更为方便。

# 引用reuqirejs

如何在页面中引用requirejs？想来应该跟一般的js文件的引用是一样的，但是这两者之间还是有点不同的。两者的差别如下：
<pre><code class='syntax brush-html'>
<!-- 传统引用js的方式 -->
<script src="jquery.js" charset="utf-8" type="text/javascript"></script>
<script src="underscore.js" charset="utf-8" type="text/javascript"></script>

<!-- requirejs方式-->
<script src="require.js" data-main="app.js" charset="utf-8" type="text/javascript"></script>
</code></pre>

通过上面的代码应该很容易就能分辨出两者引用的差别，差了一个data-main属性，这个属性就是用来定义真正js入口的地方。如以上的代码，该页面的js入口就是app.js,所以你所有的页面逻辑都应该存储在app.js中，这个js也叫做主模块，一般一个页面只需要这一个主模块，就相当于main函数。

# 使用requirejs

通过引用requirejs已经可以在主模块中使用require这个全局函数了，所以主模块的文件看起来就像这样

<pre><code class='syntax brush-javascript'>//app.js

require(['underscore','jquery'],function(_,$){
	$('div').html(_.add(3,2));
})
</code></pre>

有人可能这样可以引入，有人可能失败了，报错requirejs找不到这两个模块，那是因为文件目录的问题，也就是接下来介绍的配置问题，和多重依赖问题。如果你的目录是下面这样就一定可以成功。
<pre><code class='syntax brush-javascript'>
test-
	|--require.js
	|--jquery.js
	|--underscore.js
	|--app.js
	|--index.html
</code></pre>

原因是应为requirejs加载文件是以当前目录来进行查找的，如果没有配置路径，那么它将在当前目录下寻找{moduleName}.js这个文件

# requirejs配置

requirejs中的配置是通过require.config()这个函数来完成的，通常在主模块的开始进行配置如下
<pre><code class='syntax brush-javascript'>
//文件目录
test-
	|--js-
		|-lib-
			|--require.js
			|--jquery.js
			|--underscore.js
		|--app.js
	|--index.html
</code></pre>

<pre><code class='syntax brush-javascript'>//app.js
require.config({
	'baseUrl':'js',
	'path':{
		'jquery':'lib/jquery',
		'underscore':'lib/underscore'
	}
});
require(['underscore','jquery'],function(_,$){
	$('div').html(_.add(3,2));
})
</code></pre>

## config.baseUrl

baseUrl从名称上来看就知道它的作用，从上面的配置的例子就可以看出这是用来配置路径的，配置的是根路径。如上面的例子中配置的根路径是当前目录下的js文件夹，如果没有配置这个选项，那么根路径就是requirejs的路径，如果使用了<b>data-main</b>属性，那么根路径就是该路径。

baseUrl还可以是不同域中的url
<pre><code class='syntax brush-javascript'>//app.js
require.config({
	'baseUrl':'http://www.example.com/js',
	'path':{
		'jquery':'lib/jquery'
	}
});
</code></pre>

上述代码将加载http://www.example.com/js/lib/jquery.js 。

## config.paths

paths直接在baseUrl下方找到的模块名称的路径映射。假设路径设置是相对于baseUrl，除非路径设置以“/”开头，或者在其中有一个URL协议（“http：”）。上述例子中的配置'underscore':'lib/underscore'，将生成的地址映射成'js/lib/underscore.js'。模块名不应该包含后缀名。

## config.shim

配置不使用define（）的较旧的传统“浏览器全局”脚本的依赖关系，导出和自定义初始化，以声明依赖关系并设置模块值。

这是一个例子。它需要RequireJS 2.1.0+，并假定backbone.js，underscore.js和jquery.js已安装在baseUrl目录中。如果没有，那么您可能需要为他们设置路径配置：

<pre><code class='syntax brush-javascript'>
requirejs.config({
    
    shim: {
        'backbone': {
            //该脚本依赖jquery和underscore
            deps: ['underscore', 'jquery'],
            //加载时，全局变量’Backbone‘将作为一个模块的值
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'foo': {
            deps: ['bar'],
            exports: 'Foo',
            init: function (bar) {
				//使用一个函数可以让你调用noConflict函数，使得可以支持这个模块，不至于发生冲突。
                return this.Foo.noConflict();
            }
        }
    }
});

//下面的是一个单独的文件，名字叫'MyModel.js'，用define定义的模块，以backbone作为依赖
//RequireJS将会用shim中的配置来读取backbone，并且将给这个模块一个本地的backbone引用，
//全局变量Backbone依旧可以在这个页面使用
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({});
});
</code></pre>

注意：<b>shim</b>选项仅仅用于配置非AMD规范的脚本(不是用define定义的模块)，如果shim用在了AMD规范模块下，就不能正常工作，并且init配置和exports也不会起作用

如果只是对于jQuery或Backbone插件的“模块”，不需要导出任何模块值，shim配置只能是一个依赖关系的数组：

<pre><code class='syntax brush-javascript'>
requirejs.config({
    shim: {
        'jquery.colorize': ['jquery'],
        'jquery.scroll': ['jquery'],
        'backbone.layoutmanager': ['backbone']
    }
});
</code></pre>

但是，请注意，如果要在IE中获取404加载检测，以便可以使用路径回退或errbacks，则应该给出字符串导出值，以便加载程序可以检查脚本是否实际加载（init的返回值不用于enforceDefine检查）：
<pre><code class='syntax brush-javascript'>
requirejs.config({
    shim: {
        'jquery.colorize': {
            deps: ['jquery'],
            exports: 'jQuery.fn.colorize'
        },
        'jquery.scroll': {
            deps: ['jquery'],
            exports: 'jQuery.fn.scroll'
        },
        'backbone.layoutmanager': {
            deps: ['backbone']
            exports: 'Backbone.LayoutManager'
        }
    }
});

</code></pre>

其他的一些高级配置和运用将在下一篇文章中介绍

# 模块的定义

## define函数

关于require怎么定义模块，请参考[require.js - AMD规范](detail.html?data=require)这篇文章





































