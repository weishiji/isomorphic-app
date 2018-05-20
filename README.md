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
