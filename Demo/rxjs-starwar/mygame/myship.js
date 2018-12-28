/**
 * 自己的飞船
 * 扩展思考：如何实现右键点击时更换飞船类型?
 */

//鼠标移动流
let mouseMoveStream = Rx.Observable.fromEvent(window, 'mousemove')
.distinct() //位置发生变化时触发
.map(function (data) {
    return {
        x:data.clientX,
        y:canvas.height - 100
    }
});

//飞船类型静态流
let shipTypeStream = Rx.Observable.from([
       [0,0,130,90],
       [135,0,130,100],
       [265,0,126,100],
       [0,170,110,100]
    ]).toArray();

//鼠标右键流-实现类型切换,每次生成一个序号，然后从静态飞船流中拿出图形数据
let mouseRightStream = Rx.Observable.fromEvent(window, 'contextmenu')
.map(function (event) {
    event.preventDefault();//禁止右键弹出菜单
})
.scan(count=>count+1,0)//记录点击次数
.map(count=>count % 4).startWith(0);//将次数转换为飞船类型序号


//鼠标左键流-实现子弹发射
let mouseClickStream = Rx.Observable.fromEvent(canvas, 'click')
.sample(200)
.scan((prev,cur)=>{
   prev.push({
       x:cur.clientX,
       y:canvas.height - 50,
       used:false //标记是否已经击中某个飞船
   });
   return prev.filter((bullet)=>{return bullet.y || !bullet.used});
},[])
.startWith([{x:0,y:0}]);

//玩家飞船流
let myShipStream = Rx.Observable.combineLatest(mouseMoveStream,
                                               shipTypeStream,
                                               mouseRightStream,
                                               mouseClickStream,
                                               function(pos,typeArr,typeIndex,bullets){
                                                  return {
                                                    x:pos.x,
                                                    y:pos.y,
                                                    shape:typeArr[typeIndex],
                                                    bullets:bullets
                                                  }
                                               });

//绘制飞船
function paintMyShip(ship) {
    //绘制飞船
    ctx.drawImage(spaceShipImg,ship.shape[0],ship.shape[1],ship.shape[2],ship.shape[3], ship.x - 50, ship.y, ship.shape[2],ship.shape[3]);
    //绘制自己子弹
    ship.bullets.forEach(function (bullet) {  
         bullet.y = bullet.y - 10;
         ctx.drawImage(spaceShipImg, ship.shape[0],ship.shape[1],ship.shape[2],ship.shape[3], bullet.x , bullet.y, ship.shape[2] / 4 ,ship.shape[3] / 4);
    });
}
