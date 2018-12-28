/**
 * 碰撞检测
 */

// 辅助函数
function isCollision(target1, target2) {
 return (target1.x > target2.x - 50 && target1.x < target2.x + 50) && (target1.y > target2.y - 20 && target1.y < target2.y + 20);
}

//碰撞检测方法
function checkCollision(myship, enemies) {
    let gameOver = false;
    myship.bullets.forEach(function(bullet) {
        enemies.forEach(function (enemy) { 
            //检查是否击中了敌机
            if (isCollision(bullet, enemy)) {
                 bullet.used = true;
                 enemy.isDead = true;
            };
            //检查是否被击中，被击中则游戏结束
            enemy.bullets.forEach(function (enemyBullet) {
                if (isCollision(myship, enemyBullet)) {
                    gameOver = true;
                }
            })
        })
    });
    return gameOver;
}
