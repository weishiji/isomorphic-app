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

```webpack babel-loader```等开发工具的安装
-------------
- ```npm install babel-loader babel-core babel-preset-env webpack```

```module-resolver```解决```babelrc```中路径的问题
- ``` npm install babel-plugin-module-resolver -D```
