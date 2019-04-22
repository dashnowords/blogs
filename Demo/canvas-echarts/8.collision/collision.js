/**
 * 获取canvas绘图上下文
 * @type {[type]}
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var colorPalette = [
    '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53',
    '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'
];

let balls = [];
let steps = 0;//全局帧数记录
let rightBorder = 800;
let bottomBorder = 300;

start();

function start() {
    requestAnimationFrame(startAnim);
}

//绘制背景
function paintBg() {
   context.strokeStyle = "#353535";
   context.lineWidth = 1;
   context.fillStyle = "white";
   context.fillRect(1,1,rightBorder- 1, bottomBorder - 1);
   context.strokeRect(0,0,rightBorder,bottomBorder);
}

//帧动画
function startAnim() {
    steps++;
    //重绘背景
    paintBg();
    //每隔一定时间增加一个小球
    if (steps % 100 === 0 && steps < 1500) {
      addBall();
    }
    //更新每个小球的状态
    balls = balls.map((ball,index,originArr)=>{
      ball.update(index,originArr);
      ball.paint();//描线但不在画布上绘制
      return ball;
    });
    //绘制每个小球位置
    requestAnimationFrame(startAnim);
}

//每隔一定时间增加一个新的球体
function addBall() {
   let ball = new Ball(50,30,balls.length);
       ball.color = colorPalette[parseInt(steps / 100,10) % 10];
       ball.velocity = new Vector2(5*Math.random(), 5 * Math.random());
       balls.push(ball);
}
