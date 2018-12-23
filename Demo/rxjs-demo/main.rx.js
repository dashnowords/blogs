//定义动画帧率
var rxjsRatio = 50;
var rxjsFrame = parseInt(1000/rxjsRatio,10);
//构建角色动画流
var roleStream = Rx.Observable.interval(rxjsFrame).map(i=>{return {x:0,y:(i%12)*68}});
//构建背景动画流
var bgiStream = Rx.Observable.interval(rxjsFrame).map(i=> i%800);
//合并流
var rxjsAnim = Rx.Observable.combineLatest(roleStream,bgiStream,(role, bgi)=>{
                                       return {role,bgi}
                                   }).subscribe(rxjsRender);

//绘制角色
function rxjsPaintRole(rolePos) {
       ctx2.drawImage(roleImg, rolePos.x , rolePos.y , 54 ,  64 , 120 , 304, 54, 64);
}

//绘制背景
function rxjsPaintBgi(offset) {
      let delta = 92;
       //绘制左半部分
       ctx2.drawImage(bgImg , offset + delta , 0 , 800 + delta - offset , 576 , 0 , 0 , 800 + delta - offset , 400);
       //绘制右半部分
       ctx2.drawImage(bgImg , delta, 0 , offset, 576 , 800 - offset , 0 , offset , 400);
}

//绘制
function rxjsRender(actors) {
    rxjsPaintBgi(actors.bgi);
    rxjsPaintRole(actors.role);
}

