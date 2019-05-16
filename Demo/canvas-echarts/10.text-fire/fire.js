const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// 日期格式化工具
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

var colorPalette = [
    "#2ec7c9",
    "#b6a2de",
    "#5ab1ef",
    "#ffb980",
    "#d87a80",
    "#8d98b3",
    "#e5cf0d",
    "#97b552",
    "#95706d",
    "#dc69aa",
    "#07a2a4",
    "#9a7fd1",
    "#588dd5",
    "#f5994e",
    "#c05050",
    "#59678c",
    "#c9ab00",
    "#7eb00a",
    "#6f5553",
    "#c14089"
];

let balls = [];
let timer = new Timer();
let rightBorder = 800;
let bottomBorder = 300;
let gap = 5;
let xs = 380; //文字所占区域宽度
let ys = 120; //文字所占区域高度
let imgData =[];//覆盖文字的矩形区域的像素点信息
let checkPercent = 0.4;//检测区域中非白色像素点的比例小于限制时需要生成烟花
let textLeft = 180; //文字距离画布左侧距离
let textTop = 80;//文字距离画布上侧距离
let g = new Vector2(0,9.8);//重力加速度

start();

function start() {
    init();
    requestAnimationFrame(startAnim);
}

//初始化设置
function init(){
    // 设置字体
    context.font = "80px bold impact";
    // 设置颜色
    context.fillStyle = "black";
    // 设置水平对齐方式
    context.textAlign = "left";
    // 设置垂直对齐方式
    context.textBaseline = "top";
}

//绘制背景
function paintBg() {
   context.strokeStyle = "#353535";
   context.lineWidth = 1;
   context.fillStyle = "white";
   context.fillRect(1,1,rightBorder - 1, bottomBorder - 1);
   context.strokeRect(0,0,rightBorder,bottomBorder);
}

//帧动画
function startAnim() {
    //重绘背景
    paintBg();
    //更新计时器状态
    timer.update();
    timer.paint(context);
    //时间发生变化时，生成新的小球并推入数组
    handleTimerChange();
    //更新每个小球的状态
    balls = balls.map(ball=>{
      ball.update();
      ball.paint();//描线但不在画布上绘制
      return ball;
    }); 
    //绘制每个小球位置
 requestAnimationFrame(startAnim);
}

//时间变化时生成爆破
function handleTimerChange() {
  let position;
  //如果时间变化，则生成新的爆破小球
  if (!timer.shouldAnim) {
      //过滤掉生命耗尽的粒子
      balls = balls.filter(ball=>ball.life);
      //生成新的文字烟花
      for(let y = 0; y < ys / gap; y++){
        for(let x= 0; x < xs / gap ; x++){
           position = shouldAddBall(x, y);
           if (position) {
               addBall(position);
           }
        }
      }
  }
}

//检测指定区块是否需要生成烟花圆
function shouldAddBall(x, y) {
   let pixels = context.getImageData(textLeft + x*gap, textTop + y*gap, 5, 5);
   if(!count(pixels)) return
   return {
      x:textLeft + x*gap,
      y:textTop + y*gap
   }
}

function count(pixels) {
   let data = pixels.data;
   let total = data.length;
   let num = data.filter(item=>item !== 255).length;
   return (num / total) > checkPercent;
}

//每隔一定时间增加一个新的球体
function addBall(pos) {
   let {x,y} = pos;
   let r = Math.ceil(Math.random() * 4+1);
   let i = Math.ceil(Math.random() * 16);
   let left = pos.x < (textLeft + xs / 2) ? -1 : 1;
   let ball = new Ball(x,y,r,balls.length);
       ball.color = colorPalette[i];
       ball.velocity = new Vector2(left * 10 *Math.random(), -20 * Math.random());
       balls.push(ball);
}

