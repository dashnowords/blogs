/**
 * 敌方飞船
 */

//辅助函数-判断是否超出画布范围
function isVisible(obj) {
   return obj.x > -60 && obj.x < canvas.width + 60 && obj.y > -60 && obj.y < canvas.height + 60;
}

//每2秒在随机横向位置产生一个敌机
let enemyShipStream = Rx.Observable.interval(2000)
.scan((prev)=>{//敌机信息需要一个数组来记录，所以通过scan运算符将随机出现的敌机信息聚合
     
     let newEnemy = {
        shape:[238,178,120,76],
        x:parseInt(Math.random() * canvas.width,10),
        y:50,
        isDead:false,//标记敌机是否被击中
        bullets:[]
     }

     //定时生成子弹
     Rx.Observable.interval(1500).subscribe(()=>{
         if (!newEnemy.isDead) {
            newEnemy.bullets.push({ x: newEnemy.x, y: newEnemy.y });
         }
         newEnemy.bullets = newEnemy.bullets.filter(isVisible);
     });
      
     prev.push(newEnemy);
     return prev.filter(isVisible);
},[]);

//绘制飞船
function paintEnemy(enemies) {
   enemies.forEach(function (enemy) {
       //绘制时增量改变敌机坐标
       enemy.y = enemy.y + 3;
       enemy.x = enemy.x + parseInt(Math.random()*8 - 4,10);
       //绘制时增量改变敌机子弹坐标
       enemy.bullets.forEach(function(bullet){bullet.y = bullet.y + 16;});
       //如果敌机没挂则绘制飞机
       if (!enemy.isDead) {
         ctx.save();
         ctx.translate(enemy.x, enemy.y);
         ctx.rotate(Math.PI);
         //绘制敌机
         ctx.drawImage(spaceShipImg,enemy.shape[0],enemy.shape[1],enemy.shape[2],enemy.shape[3], 0, 0, enemy.shape[2] * 0.8 ,enemy.shape[3] * 0.8);
         ctx.restore();
       }
       //绘制子弹
       enemy.bullets.forEach(function (bullet) {
          ctx.save();
          ctx.translate(bullet.x, bullet.y);
          ctx.rotate(Math.PI);
          ctx.drawImage(spaceShipImg,enemy.shape[0],enemy.shape[1],enemy.shape[2],enemy.shape[3], 0, 0, enemy.shape[2] / 4,enemy.shape[3] / 4);
          ctx.restore();
       });
       ctx.restore();
   });
}
