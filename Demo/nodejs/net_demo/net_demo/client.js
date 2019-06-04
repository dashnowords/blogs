const net = require('net');

let socket = new net.Socket();
socket.setEncoding('utf8');
socket.connect(12315);

socket.on('connect',c=>{
    console.log('成功建立和12315的连接')
    setTimeout(()=>{
        console.log('建立连接1s后发送消息');
        socket.write('SN:1231512315','utf8',function(){
            console.log('消息已发送');
        });
    },1000);
});

socket.on('data',function(resp){
    console.log('收到服务器返回消息：',resp);
    console.log('1s后关闭socket');
    setTimeout(()=>{
        socket.end();
    },1000);
});

socket.on('end',function(){
    console.log('socket从客户端被关闭了');
})
