const danmuchannel = require('./index')(412);
(async ()=>{
    while(1){
        console.log(await danmuchannel.output())
    }
})()
