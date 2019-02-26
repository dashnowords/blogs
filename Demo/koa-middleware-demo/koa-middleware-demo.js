/*
* KOA中间件框架的基本实现
 */
http = require('http');

class MiddleWare {
    constructor(){
        this.queue = []
    }

    //添加中间件函数
    use(fn){
       this.queue.push(fn);
    }

    //合并中间件处理流
    compose(){
        return function (ctx, next) {
           let _this= this;
           let index = -1;
           return dispatch(0);
           
           /**
            * KOA中间件的工作的步进函数
            */
           function dispatch(i) {
             index = i;
             let fn = i === _this.queue.length ? next : _this.queue[i];
             if(!fn){
               return Promise.resolve();
             }
             
             try{
                 return Promise.resolve(fn(ctx,()=>{
                   return dispatch(i+1);
                 }));
             }catch(err){
                 return Promise.reject(err);
             }
           }
        }
    }
}

//初始化
let middleware = new MiddleWare();

//添加回调函数
middleware.use(async function(ctx, next){
  console.log('step 001');
  ctx.info = 'go through middleware1';
  await next();
  console.log('step 006');
});

middleware.use(async function(ctx, next){
  console.log('step 002');
  await next();
  console.log('step 005');
});

middleware.use(async function(ctx, next){
  console.log('step 003');
  await next();
  console.log('step 004');
});

middleware.start = middleware.compose();

http.createServer(function(req, res){
    console.log(req.url);
    let info = {};
    middleware.start(info);
    res.end(JSON.stringify(info));
}).listen(9527);

