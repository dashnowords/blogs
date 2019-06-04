const net = require('net');
const cluster = require('cluster');
const path = require('path');
const { StringDecoder } = require('string_decoder');
let decoder = new StringDecoder('utf8');
let serverForClient;//作为客户端的server
let serverForIPC;//作为子进程的server
let workers = [];//存储worker进程对象

/*
*   以pid为键存储worker进程与主进程通讯的socket
*   sockets={
*     '12315':{
*         worker: workerSocket,
*         client: clientSocket
*     }
*  }
*   上例表示从clientSocket发送的请求数据通过workerSocket传给子进程进行处理
*/
let sockets = {};
let idx = 0;//指向下一次请求该被该分配给workers中socket的位置

if (cluster.isMaster) {
    setupMaster();
    let worker1 = cluster.fork();
    workers.push(worker1);
    let worker2 = cluster.fork();
    workers.push(worker2);
} else {
    setupWorker();
}

//主进程逻辑
function setupMaster() {
    //作为Server监听客户端消息
   serverForClient = net.createServer(socket=>{
        console.log('[master]:有客户端连接到了主进程监听的端口,远程地址:',socket.remoteAddress);
        /**
         * 调度并记录socket的委托情况，2个子进程，通过自增序号模2实现轮换调用，
         * 记录当一个客户端链接被分给了哪个子进程,以便收到子进程消息后能够找到对应的客户端请求
         */
        sockets[workers[idx % 2].process.pid].client = socket;
        socket.pipeSocket = sockets[workers[idx % 2].process.pid].worker;
        idx++;
        //当接到客户端请求以后，假设只依据最简单的顺序分发策略把socket传给其他子进程来处理
        socket.on('data',data=>{
          dispatch(socket,data);
        });
   });

   serverForClient.listen(12315).on('listening',function(){
       console.log(`[master]:主进程监听12315端口`);
   });

    //作为Server被子进程连接以实现IPC通讯
   let ipcPath = path.join('\\\\?\\pipe', process.cwd(), 'dashipc');
   serverForIPC = net.createServer(socket=>{
        console.log(`[master]:子进程通过ipcServer连接到主进程`);
        socket.on('data',data=>{
            let message = JSON.parse(decoder.write(data));
               //首次接收消息时在主进程中建立pid与socket的映射关系
               if(message.type === 'internal_init'){
                   socket.pid = message.pid;
                   sockets[message.pid] = {
                      worker: socket,
                      client: null
                   };
                   return;
               }
               
               //接收子进程处理后的正式请求
                message.content = message.content + `主进程接收处理完的请求`;
                let clientSocket = sockets[message.pid].client;//查找对应的客户端socket
                clientSocket.end(message.content,'utf8',c=>{
                     console.log(`远程地址为${clientSocket.remoteAddress}的连接已经处理结束并关闭\n\n`);
                })
        });
   });
   serverForIPC.listen(ipcPath);
}

//子进程逻辑
function setupWorker() {
    let ipcPath = path.join('\\\\?\\pipe', process.cwd(), 'dashipc');
    let socket = new net.Socket();

    //与主进程建立连接
    socket.connect(ipcPath,c=>{
        console.log(`[child-${process.pid}]:pid为${process.pid}的子进程已经连接到主进程`);
        //首次建立通讯时发送自己的pid号给主进程以识别socket来源
        let message = {
            type:'internal_init',
            pid:process.pid
        };
        socket.write(JSON.stringify(message),'utf8');
    });

    //监听主进程分发的连接消息
     socket.on('data',data=>{
      //子进程编辑网络请求数据
      let message = JSON.parse(decoder.write(data));

      //处理请求，并以pid作为处理者标识
      message.content = message.content + `子进程${process.pid}处理了消息->`;
      message.pid = process.pid;

      console.log(`[child-${process.pid}]:pid为${process.pid}的子进程接收到主进程分发的客户端请求`);
      
      //发送处理后的网络请求给主进程
      socket.write(JSON.stringify(message),'utf8');
    })
}

//分发客户端请求
function dispatch(clientSocket,data) {
   let message = {
       type:'request',
       request:data,
       content:'主进程转发->'
   };
 
   //根据工作进程pid找到sockets集合中对应进程的socket套接字，通过它把请求转发给子进程。
   clientSocket.pipeSocket.write(JSON.stringify(message),'utf8', (err,data)=>{
      if(err) throw err;
      console.log(`[master]:已将客户端请求分发给pid为${clientSocket.pipeSocket.pid}的子进程socket`);
   });
}
