const fetch = require('node-fetch')
class JSChannel {
    constructor() {
        this.outputBuffer = [];
        this.inputBuffer = [];
    }

    output() {
        if (this.inputBuffer.length) {
            const input = this.inputBuffer.shift();
            return Promise.resolve(input);
        }
        const defferred = (() => {
            let resolve, reject;
            let promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return {
                promise,
                resolve,
                reject
            };
        })();

        this.outputBuffer.push(defferred);
        return defferred.promise;
    }

    input(item) {
        if (this.outputBuffer.length) {
            const output = this.outputBuffer.shift();
            output.resolve(item);
            return;
        }

        this.inputBuffer.push(item);
    }
}

async function roominfo2(id) {
    return new Promise(function (resolve) {
        fetch(`https://api.live.bilibili.com/room_ex/v1/RoomNews/get?roomid=${id}`).then(function (rx) {
            rx.json().then(
                function (r) {
                    resolve(r)
                }
            )
        })
    })
}

const { LiveWS, LiveTCP, KeepLiveWS, KeepLiveTCP } = require('bilibili-live-ws')

module.exports = function (roomid) {
    const c = new JSChannel()
    roominfo2(roomid).then(result => {
        if (result.code != 0) {
            console.error(result)
            return
        }
        console.log(`直播间号:${result.data.roomid} 主播:${result.data.uname} `)
        console.log(`简介:${result.data.content}`)
        console.log(`-----------------------------------------------`)
        const live = new KeepLiveTCP(Number(result.data.roomid))
        live.on('msg', msg => {
            c.input(msg)
        })
    })
    return c
}
