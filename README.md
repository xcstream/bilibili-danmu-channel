
获取bilibli直播间弹幕信息

在bilibili-live-ws基础上做了些微小的工作

支持短号和输出直播间信息

只有一个api:类似管道输出

```
    const danmuchannel = require('bilibili-danmu-channel')(412);
    (async ()=>{
        while(1){
            console.log(await danmuchannel.output())
        }
    })()
```
