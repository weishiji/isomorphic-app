# isomorphic-app
项目描述
----------
单页面程序由前端

项目启动
--------
将```.env.exmaple```复制并重命名为```.env```,是项目运行中的环境变量。
```env
HOST=http://localhost
PORT=3000
API_PORT=80
NODE_ENV=development
BLUEBIRD_DEBUG=0
```
``package.json``安装原则
---------
- 开发中用到的组件命令是 ```npm i ${name} --save-dev``` 
- 实际代码中用到的组件安装命令是```npm i ${name} -S```

```eslint```语法检测安装
------------
- ```npm install eslint --save-dev```
- ``` ./node_modules/.bin/eslint --init```
- 选择```Airbnb```风格的语法检测

```webpack babel-loader babelrc```等开发基础的安装
-------------
- ```npm install babel-loader babel-core babel-preset-env webpack -D```
- ``` npm install babel-plugin-module-resolver -D```
- ``` npm install babel-preset-react -D```
- ```npm install --save-dev babel-preset-es2015``` 可以让nodejs支持jsx文件

服务端```import``` app 文件夹下的文件，需要解决路径的问题，同构app的情况下路径解决需要用到的组件为```babel-plugin-module-resolver```，但是由于我们使用了eslint语法检测工具，为防止vscode找不到alias的路径，我们继续需要引入eslint的一些插件解决此问题
- ``` npm install babel-plugin-module-resolver -D```
```JSON
.babelrc
"plugins": [
    ["module-resolver", {
      "root": ["./app"],
      "alias": {
        "theme": "./app/theme",
        "utils": "./app/utils",
        "pages" : "./app/pages",
        "assets" : "./app/assets",
        "config": "./app/config",
        "actions": "./app/actions",
        "reducers": "./app/reducers",
        "selectors": "./app/selectors",
        "components" : "./app/components"
      }
    }]
  ]
```
- ``` npm install eslint-plugin-import eslint-import-resolver-babel-module -D```
```JSON
.eslintrc.js
"settings": {
    "import/resolver": {
      "babel-module": {},
    },
  },
```
- 为了让```PropTypes```组件在```eslint```的检测中```object```不报错，我们需要在配置文件中加入一条规则
```JSON
.eslintrc.js
"rules": {
    "comma-dangle": 0,
    "function-paren-newline": ["error", "consistent"],
    "class-methods-use-this": "off",
    "no-nested-ternary": "off",
    "no-confusing-arrow": "off",
    "react/forbid-prop-types": "on", // 禁止object检测报错
  },
```

- nodejs支持动态```import```,我们需要安装很多babel组件
```javascript
npm i babel-plugin-import-inspector -D
npm i babel-plugin-module-resolver -D
npm i babel-plugin-syntax-class-properties -D
npn i babel-plugin-syntax-object-rest-spread -D
npm i babel-plugin-system-import-transformer -D
npm i babel-plugin-transform-async-to-generator -D
npm i babel-plugin-transform-class-properties -D
npm i babel-plugin-transform-object-rest-spread -D
npm i import-inspector -D
```
新增的```.babelrc```的配置为
```JSON
"babel-plugin-syntax-class-properties",
"babel-plugin-transform-class-properties",
"babel-plugin-syntax-object-rest-spread",
"babel-plugin-transform-object-rest-spread",
"babel-plugin-transform-async-to-generator",
["import-inspector", {
  "serverSideRequirePath": true,
  "webpackRequireWeakId" : true
}],
["system-import-transformer", { "commonJS": { "useRequireEnsure": true} }],
"react-loadable/babel",
```
启动项目
--------------------
```command
npm run client:dev  // 启动前端编译
npm run server:dev  // 启动服务端
```

