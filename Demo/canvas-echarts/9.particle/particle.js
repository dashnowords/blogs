/**
 * 获取canvas绘图上下文
 */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let dirty = true;//标记是否需要重绘
let explodeCenter = new Vector2(0,0);//上一次爆炸中心位置
let explodeR = 80;//爆炸半径常量
let gap = 3;//点间距
let canvasWidth = 1200;

start();

function start() {
    bindMouseMove();
    createParticles();
    paintBg();
    paintParticles();
    requestAnimationFrame(animStep);
}

//动画循环
function animStep() {
    //重绘背景
    paintBg();
    //计算particle在极小时间内的参数变化并重绘
    paintParticles();
    //继续动画循环
    requestAnimationFrame(animStep);
}

//监听鼠标移动事件
function bindMouseMove() {
    canvas.onmousemove = function (event) {
        //记录当前鼠标位置
        explodeCenter = new Vector2(event.clientX - canvas.scrollTop, event.clientY - 0);
        //处理爆炸后的粒子数据
        explode(explodeCenter);
    }
}

//生成粒子
function createParticles() {
    let w = canvas.width / gap;
    let h = 300 / gap;
    for(let i = 0; i < w; i++){
        particles[i] = [];
        for(let j = 0; j < h; j++){
            let particle = new Particle(i*gap, 250 + j*gap);
            particles[i].push(particle);
        }
    }
}

//绘制背景
function paintBg() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

//绘制粒子
function paintParticles() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    for(let i = 0; i < particles.length; i++){
        for(let j =0; j <particles[i].length; j++){
            //更新粒子状态
            particles[i][j].update();
            //绘制粒子
            ctx.moveTo(particles[i][j].pos.x,particles[i][j].pos.y);
            ctx.arc(particles[i][j].pos.x,particles[i][j].pos.y,0.9,0,Math.PI*2,false);
        }
    }
    ctx.fill();
}

//在(x,y)点产生爆炸
function explode(center) {
    for(let i = 0; i < particles.length; i++){
        for(let j =0; j <particles[i].length; j++){
           //如果粒子的位置距离爆点过近则受影响
           if (nearExplode(particles[i][j] , center)) {
               explodePoint(particles[i][j], center); 
           }
        }
    }
}

//判断粒子是否被爆炸波及
function nearExplode(p,center) {
   return new Vector2(p.pos.x- center.x , p.pos.y - center.y).length() < explodeR;
}

//爆炸时某个点的影响
function explodePoint(p,center) { 
    let factor= Math.random() * 10;
    let dis = new Vector2(p.pos.x - center.x, p.pos.y - center.y).length();
    //核心点炸开
    if (dis < 0.3 * explodeR) {  
        //初始位置
        p.pos = explodeCenter.add(new Vector2(p.pos.x - center.x, p.pos.y - center.y).normalize().multiply(explodeR*(1+Math.random()*6)));
    } else {
       //非核心点炸至半径附近
        p.pos = explodeCenter.add(new Vector2(p.pos.x - center.x, p.pos.y - center.y).normalize().multiply(explodeR*(1+Math.random()/10)));
    }
}
