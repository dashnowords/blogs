const net = require('net');
const { StringDecoder } = require('string_decoder');
let decoder = new StringDecoder('utf8');

let server = net.createServer(socket=>{
    console.log('接收连接');
    console.log('socket localAddress:',socket.localAddress);
    console.log('socket remoteAddress:',socket.remoteAddress);
    socket.on('data',data=>{
        console.log('收到来自客户端的消息:',decoder.write(data));
            setTimeout(()=>{
                console.log('1s后发送返回消息');
                socket.write('SN:1231512315+ACK','utf8',function(){
                    console.log('返回消息已发送');
                });
            },1000);
    });

    socket.on('end',function(){
       console.log('socket从客户端被关闭了');
       console.log('1s后关闭服务器');
            setTimeout(()=>{
                 server.close();
            },1000);
    });
});

server.listen(12315).on('close',function () {
    console.log('server已经关闭了');
});
