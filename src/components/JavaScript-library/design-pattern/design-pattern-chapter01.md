# 设计模式手册 - 1 - 部署开发环境

> create by **jsLe** on **2018 年 8 月 22 日 11:19:00**  
> Recently revised in **2019-05-31 17:09:27**

## 第一章 部署开发环境

为什么要部署个开发环境呢？我就不能直接将 ES6 转成 ES5 直接使用吗？回答是：可以啊！[链接拿去](https://www.cnblogs.com/yuanbo88/p/6389299.html)，里面告诉你怎么配置 babel，将 ES6 转 ES5。

如果你觉得还要配置 babel，也是挺麻烦的，[链接拿去](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015,react,stage-2&targets=&browsers=&builtIns=false&debug=false&code=)，里面已经设置好了，直接在线将 ES8、ES7、ES6 转 ES5，去吧少年~

但是，怎么说呢，工欲善其事，必先利其器。一切的编程就是为了偷懒，所以 **jsLe** 配置个 Webpack 的 ES6 环境，就是想：

- 偷懒。每次写完代码按 Ctrl+C，就可以在另一个显示屏（**jsLe** 两个显示屏的）直接看到编译结果了，而不是用命令行将 ES6 转为 ES5.
- 还是偷懒。有时候写个小项目，用原生搞的话，ES5 有时候写起来不爽啊，能耍耍 ES6 就好了，到时候还要搞事情，转 ES5、手机查看啥的，还不如直接配置好，到时候直接用啦。
- 还是还是偷懒。要知道有些个玩意，叫 vue-cli、react-cli、angular-cli，而且目前 jsLe 所知的，就是 vue-cli 是单页面 SPA 配置，到时候你要去搞多页面，还是需要学 Webpack，所以事先学学，到时候就不用焦头烂额，又学 react 又搞 Webpack 啦~对了，顺带打个广告，Webpack 的多页面配置 jsLe 已经配置好了，[Webpack 学习链接拿去](https://github.com/LiangJunrong/webpack-study)、[多页面配置链接拿去](https://github.com/LiangJunrong/webpack-MPA-config)。

好嘞，jsLe 强行解释一通，不管你接不接受，反正我是接受了，部署开发环境走起~

### 1.1 打包 JavaScript

- **本节实现目的**：部署个能打包 JavaScript 的环境：

1. 执行命令行：`npm init -y`，初始化 package.json 文件。
2. 执行命令行：`cnpm i webpack webpack-cli -D`，安装 webpack 及其命令行工具 webpack-cli。
3. 在根目录下新建 src 文件夹，并在里面新建 index.js 文件，该文件打印了个 100。

> index.js

```
console.log(100);
```

4. 在根目录下新建 webpack.dev.config.js 文件。

> webpack.dev.config.js

```
module.exports = {
    entry: './src/index.js', // 入口文件
    output: { // 出口文件
        path: __dirname,
        filename: './dist/src/index.js'
    },
}
```

> 在 webpack.dev.config.js 中，我们做了两件事：
>
> 1. 告知 webpack 我们的入口文件（需要被解析的 ES6 文件）在根目录的 src 下的 index.js；
> 2. 告知 webpack 我们的出口文件（被解析后的 ES5 文件）需要打包到的位置是相对于当前目录的 dist/src 下的 index.js。

<br>

5. 修改 package.json 文件。

> package.json

```
{
  "name": "design-pattern",
  "version": "1.0.0",
  "description": "design pattern for javascript",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --config ./webpack.dev.config.js --mode development"
  },
  "keywords": [
    "javascript",
    "design",
    "pattern"
  ],
  "author": "jsLe",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
  }
}

```

> 在这里，我们修改了`"scripts"`部分，告知 npm 在`npm run dev`的时候，记得使用 webpack 命令，用开发模式来解析配置文件 webpack.dev.config.js。

6. 执行命令行：`npm run dev`，可以查看到在根目录中生成了个 dist 文件夹，该文件夹下存有一个 src 文件夹，里面包含了个 index.js。`本处有点小瑕疵，这里是src文件夹，但是到了后面变成了js文件夹，因为这是打包后的js存放的地方，当然这里是不影响使用的，下面我们会提到。`
7. 此时目前目录如下：  
   ![目录](../../public-repertory/img/js-design-pattern-chapter1-1.png)

<br>

### 1.2 动态打包 JavaScript

&emsp;**本节实现目的**：部署个能按 Ctrl+C，就能自动更新代码的 Webpack 环境。

1. 执行命令行：`cnpm i webpack-dev-server html-webpack-plugin -D`，安装 Webpack 的 devServer，这个能启动开发模式实时监控代码的 webpack 配置。同时，安装 html-webpack-plugin，这个能解析 HTML 的插件。

2. 新建 dist/index.html 文件，由于这个 HTML 文件无特殊之处，所以这里不做过多讲解：

> index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>jsLe的设计模式</title>
</head>
<body>
    <p>jsLe的设计模式</p>

    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
</body>
</html>
```

3. 根据我们安装的 webpack-dev-server 与 html-webpack-plugin 这两个配置，修改 webpack.dev.config.js，使其能解析 HTML 文件和监控 dist 目录。

> webpack.dev.config.js

```
const path = require('path'); // 加载node中的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 加载插件html-webpack-plugin

module.exports = {
    mode: 'development', // 开发模式
    entry: './src/index.js', // 入口文件
    output: { // 出口文件
        path: __dirname,
        filename: './dist/src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({ // HTML加载插件
            template: './dist/index.html'
        })
    ],
    devServer: { // 开发服务
        contentBase: path.join(__dirname, './dist'), // 根目录
        open: true, // 自动打开浏览器
        port: 8080, // 端口
        //host: "192.168.1.107" // WiFi IPV4地址，打开可共享到手机
    }
}
```

4. 修改 package.json，告知 npm，我们不用 webpack 这个比较 low 的方式了，请给我用 webpack-dev-server 来启动`npm run dev`。

> package.json

```
{
  "name": "design-pattern",
  "version": "1.0.0",
  "description": "design pattern for javascript",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --config ./webpack.dev.config.js"
  },
  "keywords": [
    "javascript",
    "design",
    "pattern"
  ],
  "author": "jsLe",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"
  }
}
```

5. 执行命令行：`npm run dev`，发现浏览器自动打开`http://localhost:8080`(启动 WiFi 的情况下应该是打开类似于`http://192.168.1.107:8080/`)的网址：  
   ![网址](../../public-repertory/img/js-design-pattern-chapter1-2.png)

6. 此时文件目录为：  
   ![目录](../../public-repertory/img/js-design-pattern-chapter1-3.png)

<br>

### 1.3 自动打包 ES6

&emsp;**本节实现目的**：部署个能按 Ctrl+C，就能自动打包 ES6 为 ES5，并且能自动更新代码的 Webpack 环境。

1. 执行命令行：`cnpm i babel-core babel-loader babel-polyfill babel-preset-env -D`，安装 ES6 对应的解析配置，执行完毕后 package.json 会自动新增依赖包：

> package.json

```
{
  "name": "design-pattern",
  "version": "1.0.0",
  "description": "design pattern for javascript",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"
  },
  "keywords": [
    "javascript",
    "design",
    "pattern"
  ],
  "author": "jsLe",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"
  }
}
```

2. 新建.babelrc 文件，该文件为 ES6 解析到 ES5 必须使用的文件（注，现在市面上大部分浏览器还不能完全直接解析 ECMA Script2015 语法，所以只能将 ES6 转为 ES5，就用到了.babelrc 文件）：

> .babelrc

```
{
    "presets": [
        "env"
    ],
    "plugins": [

    ]
}
```

3. 修改 webpack.dev.config.js，添加 module，告知 webpack 在加载 js 文件的时候，需要使用 babel-loader。

> webpack.dev.config.js

```
const path = require('path'); // 加载node中的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 加载插件html-webpack-plugin

module.exports = {
    mode: 'development', // 开发模式
    entry: './src/index.js', // 入口文件
    output: { // 出口文件
        path: __dirname,
        filename: './dist/src/index.js'
    },
    module: { // 加载模块
        rules: [{
            test: /\.js$/, // .js文件加载loader
            include: path.resolve(__dirname, "./src"), // 检查的文件夹
            exclude: path.resolve(__dirname, "./node_modules"), // 不检查的文件夹
            loader: 'babel-loader' // 使用的loader
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ // HTML加载插件
            template: './dist/index.html'
        })
    ],
    devServer: { // 开发服务
        contentBase: path.join(__dirname, './dist'), // 根目录
        open: true, // 自动打开浏览器
        port: 8080, // 端口
        host: "192.168.1.107" // WiFi IPV4地址，打开可共享到手机
    }
}
```

4. 修改 index.js，这里我们换成 ES6 语法（如果你还没学过 ES6，你只需要知道这里弹窗显示了 jsLe 即可，内容可以忽略）：

> index.js

```
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

let person = new Person("jsLe");
alert(person.getName());
```

5. 执行命令行：`npm run dev`，即可看到 HTML 页面弹窗显示 **jsLe** 。

<br>

### 1.4 完善配置

&emsp;**本节实现目的**：`npm run dev`命令下，部署个能按 Ctrl+C，就能自动打包 ES6 为 ES5，并且能自动更新代码的 Webpack 环境。`npm run build`命令下，能打包文件到 dist 目录。  
&emsp;经过上面的努力，终于可以在多终端（电脑+手机）实时查看自己编写的 ES6 代码了。然而，还是有点小瑕疵。例如：无法将代码打包应用于生产；打包 js 的目录名称叫 src……。所以，Let's Go! 再搞个生产环境，让我们完美结束这份 Webpack 配置吧~

1. 新增 webpack.prod.config.js，用作打包生产：

> webpack.prod.config.js

```
const path = require('path'); // 加载node中的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 加载插件html-webpack-plugin

module.exports = {
    mode: 'production', // 生产模式
    entry: './src/index.js', // 入口文件
    output: { // 出口文件
        path: __dirname + '/dist',
        filename: './js/index.js'
    },
    module: { // 加载模块
        rules: [{
            test: /\.js$/, // .js文件加载loader
            include: path.resolve(__dirname, "./src"), // 检查的文件夹
            exclude: path.resolve(__dirname, "./node_modules"), // 不检查的文件夹
            loader: 'babel-loader' // 使用的loader
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ // HTML加载插件
            template: './dist/index.html'
        })
    ]
}
```

2. 修改下 package.json，使其能使用命令行`npm run build`：

> package.json

```
{
  "name": "design-pattern",
  "version": "1.0.0",
  "description": "design pattern for javascript",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --config ./webpack.dev.config.js",
    "build": "webpack --config ./webpack.dev.config.js"
  },
  "keywords": [
    "javascript",
    "design pattern"
  ],
  "author": "jsLe",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.5"
  }
}
```

3. 完善下 webpack.dev.config.js：

> wepbakc.dev.config.js

```
const path = require('path'); // 加载node中的path模块
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 加载插件html-webpack-plugin

module.exports = {
    mode: 'development', // 开发模式
    entry: './src/index.js', // 入口文件
    output: { // 出口文件
        path: __dirname + '/dist',
        filename: './js/index.js'
    },
    module: { // 加载模块
        rules: [{
            test: /\.js$/, // .js文件加载loader
            include: path.resolve(__dirname, "./src"), // 检查的文件夹
            exclude: path.resolve(__dirname, "./node_modules"), // 不检查的文件夹
            loader: 'babel-loader' // 使用的loader
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ // HTML加载插件
            template: './dist/index.html'
        })
    ],
    devServer: { // 开发服务
        contentBase: path.join(__dirname, './dist'), // 监控的目录
        open: true, // 自动打开浏览器
        port: 9000, // 端口
        host: "192.168.1.107" // WiFi IPV4地址，打开可共享到手机
    }
}
```

4. 检查下其他文件，看看是否与 jsLe 一致：

> src/index.js

```
class Person {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

let person = new Person("jsLe");
alert(person.getName());
```

> .babelrc

```
{
    "presets": [
        "env"
    ],
    "plugins": [

    ]
}
```

> index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>jsLe的设计模式</title>
</head>
<body>
    <p>jsLe的设计模式</p>

    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
</body>
</html>
```

5. 执行命令行`npm run dev`或者`npm run build`,然后查看目录：  
   ![目录](../../public-repertory/img/js-design-pattern-chapter1-4.png)  
   OK，都能成功运行，生产环境部署完毕，接下来我们愉快地玩耍设计模式吧！

<br>

> <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">jsLe 的文档库</span> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/LiangJunrong/document-library" property="cc:attributionName" rel="cc:attributionURL">梁峻荣</a> 采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/LiangJunrong/document-library" rel="dct:source">https://github.com/LiangJunrong/document-library</a>上的作品创作。<br />本许可协议授权之外的使用权限可以从 <a xmlns:cc="http://creativecommons.org/ns#" href="https://creativecommons.org/licenses/by-nc-sa/2.5/cn/" rel="cc:morePermissions">https://creativecommons.org/licenses/by-nc-sa/2.5/cn/</a> 处获得。
