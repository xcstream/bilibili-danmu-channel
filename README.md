
获取bilibli直播间弹幕信息

在bilibili-live-ws基础上做了些微小的工作

支持短号和输出直播间信息

安装（建议node.js版本 > v12.0）

`
    npm i bilibili-danmu-channel
`

只有一个api:类似管道输出

```
    const danmuchannel = require('bilibili-danmu-channel')(412);
    (async ()=>{
        while(1){
            console.log(await danmuchannel.output())
        }
    })()
```

具体内容格式参考
https://github.com/xcstream/bilibili-danmu-sample
