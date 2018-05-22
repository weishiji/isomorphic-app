# isomorphic-app
``package.json``安装原则
---------
- 开发中用到的组件命令是 ```npm i ${name} --save-dev``` 
- 实际代码中用到的组件安装命令是```npm i ${name} -S```

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

服务端```import``` app 文件夹下的文件，需要解决路径的问题，同构app的情况下路径解决需要用到的组件为```babel-plugin-module-resolver```，但是由于我们使用了eslint语法检测工具，为防止vscode找不到alias的路径，我们继续需要引入eslint的一些插件解决此问题
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
