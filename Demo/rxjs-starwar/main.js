var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
var heroImg=new Image();
    heroImg.src="planes.jpg";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var SPEED = 40;
var STAR_NUMBER = 250;
/*
* 背景部分
 */
//生成星星
var StarStream = Rx.Observable.range(1, STAR_NUMBER)
.map(function () {
    return {
        x: parseInt(Math.random() * canvas.width),
        y: parseInt(Math.random() * canvas.height),
        size:Math.random()*3 + 1
     }
})
.toArray()
.flatMap(function (starArray) {
    return Rx.Observable.interval(SPEED)
    .map(function () {
        starArray.forEach(function (star) {
            if (star.y >= canvas.height) {
                star.y = 0;
            }
            star.y += 3;
        });
        return starArray;
    })
});

/*.subscribe(function (starArray) {
    paintStars(starArray);
});*/

//绘制星星
function paintStars(stars) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(function (star) {
        ctx.fillRect(star.x, star.y, star.size, star.size);
    })

}


/**
 * 主机部分
 * 重点：主机位置是鼠标移动事件流的观察者
 */
var HERO_Y = canvas.height - 50;
var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');
var SpaceShip = mouseMove
.map(function (event) {
    return {
        x: event.clientX,
        y: HERO_Y
    };
})
.startWith({
    x: canvas.width / 2,
    y: HERO_Y
});
/*.subscribe(function (hero) {
    paintSpaceShip(hero.x, hero.y);
})*/

//绘制主机
function paintSpaceShip(x,y) {
    ctx.drawImage(heroImg, 160 , 120 , 90 , 70 , x - 60 , y - 60, 90, 70);
}

/**
 * 敌机流
 */

//辅助函数
//判断是否在可见区
function isVisible(obj) {
    return obj.x > -40 && obj.x < canvas.width + 40 &&
    obj.y > -40 && obj.y < canvas.height + 40;
}


var ENEMY_FREQ = 2500;
var ENEMY_SHOOTING_FREQ = 1250;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
.scan(function (enemyArray) {
    var enemy = {
        x : parseInt(Math.random() * canvas.width),
        y : -30,
        shots : []
    };

    //敌机子弹流
    Rx.Observable.interval( ENEMY_SHOOTING_FREQ ).subscribe(function () {
        if (!enemy.isDead) {
            enemy.shots.push({x:enemy.x, y :enemy.y});
        }
        enemy.shots = enemy.shots.filter(isVisible);
    });

    enemyArray.push(enemy);
    return enemyArray.filter(isVisible).filter(function (enemy) {
        return !(enemy.isDead && enemy.shots.length === 0);
    });
},[]);

//碰撞检测
function collision(target1, target2) {
     return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
(target1.y > target2.y - 20 && target1.y < target2.y + 20);
}

//绘制敌机
function paintEnemies(enemies) {
    enemies.forEach(function (enemy) {
        enemy.y += 5;
        enemy.x += getRandomInt(-10,10);
        if (!enemy.isDead) {   
            ctx.drawImage(heroImg, 110 , 20 , 90 , 70 , enemy.x - 60 , enemy.y - 60, 90, 70);
        }
        enemy.shots.forEach(function (shot) {
            shot.y += SHOOTING_SPEED;
            drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down');
        })
    })
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 主机射击相关
 */
var playerFiring = Rx.Observable.merge(
    Rx.Observable.fromEvent(canvas, 'click'),
    Rx.Observable.fromEvent(canvas, 'keydown')
    .filter(function (evt) {
        return evt.keycode === 32;
    }))
    .sample(100)
    .timestamp();

/**
* 射击动作类，文章最开始实现有点奇怪，合并了两个流
* 却从未使用playerFiring流的数据。
* 
*  1.只有playerFiring是否可行？
*  肯定是不够的，因为每次playerFiring有新的事件产生时，需要获取spaceship的坐标，
*  来生成子弹的初始位置。
*  2.合并playerFiring和SpaceShip两个流后得到的新流有什么特点？
*  playerFiring由鼠标点击或按键触发，SpaceShip由鼠标移动触发，
*  流进行Combinelatest()合并后，如果鼠标移动，则会得到新的飞船
*  位置坐标，和上一次发射子弹的信息；如果鼠标点击或按空格键，则
*  会得到新的发射子弹的信息和最近的一个飞船位置信息（可能是当前
*  的，也可能是和当前点距离非常近的旁边的某个点）。通过scan(相
*  当于数组reduce)算子将结果聚合在一起。
*  3.timestamp和distinctUntilChanged实现了什么功能？
*  如果没有timestamp相关的约束，实现的效果是子弹流看起来更像是
*  SpaceShip流的克隆，因为playerFiring流并没有贡献什么有用的
*  数据给新的HeroShots流，实际需要的效果是SpaceShip流保持静默，
*  在playerFiring流提供新的数据时触发一次，为了判断playerFiring流
*  的事件是新的，才引进了timestamp功能，相当于每次都与前一次事件
*  的时间戳相比，因为Combinelatest()会保持每个流中的最近的值，
*  没有新事件触发时，来自playerFiring的信息都是一致的，无法区分。
*  
 */
var HeroShots = Rx.Observable.combineLatest(
    playerFiring,
    SpaceShip,function (shotEvents, spaceship) {
        return {
            timestamp: shotEvents.timestamp,
            x: spaceship.x
        }
    })
    .distinctUntilChanged(function (shot) {
        return shot.timestamp;
    })
    .scan(function (shotArray, shot) {
        shotArray.push({x:shot.x, y: HERO_Y});
        return shotArray;
    },[]);

//绘制子弹
var SHOOTING_SPEED = 15;
var SCORE_INCREASE = 10;
function paintHeroShots(heroShots, enemies) {
    heroShots.forEach(function(shot) {
        for(var j=0;j<enemies.length;j++){
            var enemy = enemies[j];
            if (!enemy.isDead && collision(shot, enemy)) {
                ScoreSubject.onNext(SCORE_INCREASE);
                enemy.isDead = true;
                shot.x = shot.y = -100;
                break;
            }
        }
        shot.y -= SHOOTING_SPEED;
        drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up');
    });
}

//绘制辅助三角形
function drawTriangle(x, y, width, color, direction) { 
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width); 
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width,y);
    ctx.fill();
}

//保持分数
/**
 * 这里教程里的用concat合并了两个流，
 * 但combinelatest后不报错也不执行，
 * 原因尚不清楚,其功能只是为分数提供初值，
 * 改为StartWith直接赋值即可。
 */
var ScoreSubject = new Rx.Subject();
var score = ScoreSubject.scan(function (prev, cur) {
    return prev + cur;
},0).startWith(0);

//融合游戏元素
//
var Game = Rx.Observable.combineLatest(StarStream, 
    SpaceShip, 
    Enemies, 
    HeroShots,
    score,
    function(stars, spaceship, enemies, heroshots, score) {
    return {
        stars: stars,
        spaceship: spaceship,
        enemies: enemies,
        heroshots: heroshots,
        score:score
    }
}).sample(SPEED)
.takeWhile(function(actors) {
    return gameOver(actors.spaceship, actors.enemies) === false;
}).subscribe(renderScene,function (err) {
    console.log(err)
});

function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroshots, actors.enemies);
    paintScore(actors.score);
}

//判断结束
function gameOver(ship, enemies) {
    return enemies.some(function (enemy) {
        if (collision(ship,enemy)) {
            return true;
        }
        return enemy.shots.some(function (shot) {
            return collision(ship, shot);
        })
    })
}

//保持分数
function paintScore(score) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('Score: ' + score, 40, 43);
}


/**
 * 1.combineLatest合并的事件流为什么开局没有触发？
 * 2.记录分数的concat合并的流实现了什么？
 * 3.为什么combineLatest合并了一个concat出来的流以后卡住了？
 * 4.原生canvas编写同一个游戏
 * 5.常见Rxjs流操作符的总结
 */
