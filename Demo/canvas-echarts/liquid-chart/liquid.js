/**
 * 获取canvas绘图上下文
 * @type {[type]}
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width=1200;
canvas.height=800;

let options = {
    value:0,
    a:20,//振幅
    pos:[300,300],//水球图位置
    r:160,//水球图半径
    color:['#2E5199','#1567c8','#1593E7','#42B8F9']
};

start(options);

/**
 * 绘制图表
 */
function start(options) {
    context.translate(options.pos[0],options.pos[1]);
    context.font = 'bold 60px Arial';
    context.textAlign='center';
    context.textBaseLine = 'baseline';
    createParams(options);
    requestAnimationFrame(startAnim);//循环动画
}

//生成水波动画参数
function createParams(options) {
    options.w = [];//存储水波的角速度
    options.theta = [];//存储每条水波的位移
    for(let i = 0; i < 4; i++){
      options.w.push(Math.PI /(100 + 20*Math.random()));
      options.theta.push(20*Math.random());
    }
}

//绘制水波线
function drawWaterLines(options) {
   let offset;
   let A = options.a;//正弦曲线振幅
   let y,x,w,theta;
   let r = options.r;
   //遍历每一条水纹理
   for(let line = 0; line < 4; line++){ 
     context.save();
     //每次绘制时水波的偏移距离
     theta = Math.random();
     offset = r + A / 2  -  (r*19/8 + A) * (options.value / 100 ) + line * r/12;
     //获取正弦曲线计算参数
     w = options.w[line];
     theta = options.theta[line];
     context.fillStyle = options.color[line];
     context.moveTo(0,0);
     context.beginPath();    
     for(x = 0; x <= 2*r; x+=0.1){
        y = A * Math.sin(w * x + theta) + offset;
        //绘制点
        context.lineTo(x,y);
     }
      //绘制为封闭图形
      context.lineTo(x,r);
      context.lineTo(x - 2 * r,r);
      context.lineTo(0, A * Math.sin(theta) - options.height);
      context.closePath();
      //填充封闭图形
      context.fill();
      //截取水波范围，绘制文字
      context.clip();
      context.fillStyle = 'white';
      context.fillText(parseInt(options.value,10) + '%',options.r + 10,10);
      context.restore();
   }
}

//绘制最底层的深色文字
function drawText1(options) {
    context.fillStyle = options.color[0];
    context.fillText(parseInt(options.value,10) + '%',options.r + 10,10);
}

//帧动画循环
function startAnim() {
    options.theta = options.theta.map(item=>item-0.03);
    options.value += options.value > 100 ? 0:0.1;
    context.save();
    resetClip(options);//剪切绘图区
    drawText1(options);//绘制蓝色文字
    drawWaterLines(options);//绘制水波线
    context.restore();
    requestAnimationFrame(startAnim);
}

//重新剪裁绘图区域
function resetClip(options) {
   let r = options.r;
   context.strokeStyle = '#2E5199';
   context.fillStyle = 'white';
   context.lineWidth = 10;
   context.beginPath();
   context.arc(r, 0, r + 10, 0, 2*Math.PI, false);
   context.closePath();
   context.fill();
   context.shadowColor = '#2E5199';
   context.shadowBlur = 2;
   context.shadowOffsetX = 0;
   context.shadowOffsetY = 2;
   context.stroke();
   context.beginPath();
   context.arc(r, 0, r, 0, 2*Math.PI, true);
   context.clip();
}
