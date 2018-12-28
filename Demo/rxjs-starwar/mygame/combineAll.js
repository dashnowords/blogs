/**
 * 集合所有流
 */

let gameStream = Rx.Observable.combineLatest(starStream,
                                            myShipStream,
                                            enemyShipStream,
                                            function (stars,myship,enemies) {
                                             return {
                                                stars,myship,enemies
                                             }
})
.sample(40);

//绘制所有元素
function paintAll(data) {
     let isGameOver;
     isGameOver = checkCollision(data.myship, data.enemies);//检查子弹是否击中敌人
     if (!isGameOver) {
         paintStar(data.stars);
         paintMyShip(data.myship);
         paintEnemy(data.enemies);
     }else{
        gameSubscription.dispose();
        alert('被击中了');
     }
}

//订阅所有汇总的流来启动游戏
let gameSubscription = gameStream.subscribe(paintAll);
