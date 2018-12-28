---
title: "使用node.js将css中px除以2"
date: "2018-12-26"
---


场景：
在H5项目中，引入vant。但vant对应的 postcss-pxtorem 配置的rootValue是37.5， 而本地项目设置的是75。

vant动不了，只能改本地的了。

使用node.js 执行脚本将本地项目样式文件中的px 全部除以2。
