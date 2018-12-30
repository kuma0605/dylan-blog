---
title: "使用node.js将css中px除以2"
date: "2018-12-26"
---


> 场景：
> 在H5项目中，引入vant。但vant对应的 postcss-pxtorem 配置的rootValue是37.5， 而本地项目设置的是75。
> vant不能修改，那就只能改本地的项目。

##思路
遍历项目中css文件, 将文件内容中的(xx)px替换成(xx/2)px

##实现
deepReplace.js
- 全局遍历scss文件(我的本地项目为scss文件，可自行替换)
- 正则替换(xx)px到(xx/2)px
```
    /(\d+(\.\d+)?)px/g //可能会含有小数
```

完整代码
```
var fs = require('fs');
var path = require('path');

//解析需要遍历目标文件夹
//可将__dirname替换成自己需要替换的文件夹路径
var filePath = path.resolve(__dirname);

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            //本地项目中用的是scss，所以匹配的是scss文件
                            console.log(filedir, filename.includes('.scss'));
                            if(filename.includes('.scss')){
                              fs.readFile(filedir,'utf-8',function(err, file){
                                // console.log(file)
                                let res = file.replace(/(\d+(\.\d+)?)px/g, function(full, match1, match2){
                                  console.log(full, match1, match2);
                                  if(full==='1px')return full;
                                  return match1/2+'px';
                                })
                                fs.writeFile(filedir, res, 'utf8', function (err) {
                                  if (err) return console.log(err);
                                });
                              })
                            }
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}
```
