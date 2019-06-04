const net = require('net');
const cluster = require('cluster');
const path = require('path');
const { StringDecoder } = require('string_decoder');

let serverForIPC;//作为子进程的server

if (cluster.isMaster) {
    setupMaster();
    cluster.fork();
    cluster.fork();
} else {
    setupWorker();
}

//主进程逻辑
function setupMaster() {
    //作为Server监听子进程消息
   let decoder = new StringDecoder('utf8');
   let ipcPath = path.join('\\\\?\\pipe', process.cwd(), 'dashipc');
   serverForIPC = net.createServer(socket=>{
        console.log(`[master]:子进程通过ipcServer连接到主进程`);
        socket.on('data',data=>{
            console.log('[master]:收到来自子进程的消息:',decoder.write(data));
        });
   });
   serverForIPC.listen(ipcPath);
}

//子进程逻辑
function setupWorker() {
    let ipcPath = path.join('\\\\?\\pipe', process.cwd(), 'dashipc');
    let socket = new net.Socket();
    socket.connect(ipcPath,c=>{
        console.log(`[child-${process.pid}]:pid为${process.pid}的子进程已经连接到主进程`);
        //过一秒后发个消息测试一下
        setTimeout(()=>{
           socket.write(`${process.pid}的消息:SN1231512315`,'utf8',function(){
              console.log(`[child-${process.pid}]:消息已发送`);
           });
        },1000);
    });
}
