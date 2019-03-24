/**
 * 获取canvas绘图上下文
 * @type {[type]}
 */
const canvas = document.getElementById('canvas');
const rect = canvas.getBoundingClientRect();
const context = canvas.getContext('2d');
canvas.height = 800;
canvas.width = 1200;

//基本绘图配置
let options = {
        chartZone:[50,50,1000,700],
        yAxisLabel:['55','60','65','70','75','80','85'],
        xAxisLabel:['0','10000','20000','30000','40000','50000','60000','70000'],
        xAxisPos:[],//用于暂存x坐标轴标签的位置
        data:[],
        paintingData:[],//用于存放绘图数据
        colorPool:['#DA5961','#1ABC9C']
    }
/*数据来自百度Echarts官方示例*/
options.data = [
    [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
    [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
];


init();

function init() {
    drawBackground();
    drawScatterChart(options);
    //使用off-screen-canvas保存绘制的像素点
    setOffScreen();
}

function setOffScreen(options) {
    canvas2 = document.createElement('canvas');
    canvas2.height = canvas.height;
    canvas2.width = canvas.width;
    context2 = canvas2.getContext('2d');
    context2.drawImage(canvas,0,0);
}

/*绘制渐变色背景*/
function drawBackground() {
    let w = canvas.width ;
    let h = canvas.height ;
    let color = context.createRadialGradient(w/2,h/2,0.2*w,w/2,h/2,0.5*w);
        color.addColorStop(0, '#eaeaea');
        color.addColorStop(1, '#ccc');
        options.globalGradient = color;
        context.save();
        context.fillStyle = color;
        context.fillRect(0,0,w,h);
        context.restore();
}

/**
 * 绘制散点图
 */
function drawScatterChart(options) {
    drawAxis(options); //绘制坐标轴
    drawYLabels(options); //绘制y轴坐标
    drawXLabels(options); //绘制x轴坐标
    drawData(options);//绘制散点图
}

/**
 * 绘制坐标轴
 */
function drawAxis(options) {
    let chartZone = options.chartZone;
    context.strokeWidth = 4;
    context.strokeStyle = '#353535';
    context.moveTo(chartZone[0],chartZone[1]);
    context.lineTo(chartZone[0],chartZone[3]); //y轴总高650
    context.lineTo(chartZone[2],chartZone[3]); //x轴总长
    context.stroke();
}

/**
 * 绘制y轴坐标
 */
function drawYLabels(options) {
    let labels = options.yAxisLabel;
    let yLength = (options.chartZone[3] - options.chartZone[1]);
    let gap = yLength / (labels.length - 1);
    
    labels.forEach(function (label, index) {
        //绘制坐标文字
        let offset = context.measureText(label).width + 20;
        context.strokeStyle = '#eaeaea';
        context.font = '16px';
        context.fillText(label, options.chartZone[0] - offset ,options.chartZone[3] - index * gap);
        //绘制小间隔
        context.beginPath();
        context.strokeStyle = '#353535';
        context.moveTo(options.chartZone[0] - 10, options.chartZone[3] - index * gap);
        context.lineTo(options.chartZone[0], options.chartZone[3] - index * gap);
        context.stroke();
    });
}

/**
 * 绘制x轴坐标
 */
function drawXLabels(options) {
    let labels = options.xAxisLabel;
    let xLength = options.chartZone[2] - options.chartZone[0]
    let gap = xLength / labels.length;
    
    labels.forEach(function (label, index) {
        context.strokeStyle = '#eaeaea';
        context.font = '18px';
        context.textAlign = 'center';
        context.fillText(label, options.chartZone[0] + (index + 1) * gap ,options.chartZone[3] + 20);
        //绘制小间隔
        context.beginPath();
        context.strokeStyle = '#353535';
        context.moveTo(options.chartZone[0] + (index + 1) * gap ,options.chartZone[3]);
        context.lineTo(options.chartZone[0] + (index + 1) * gap ,options.chartZone[3]+5);
        context.stroke();
        //由于
        options.xAxisPos[index] = (index + 1) * gap;
    });
}

/**
 * 绘制数据
 */
function drawData(options) {
    let data = options.data;
    let xLength = (options.chartZone[2] - options.chartZone[0]);
    let yLength = (options.chartZone[3] - options.chartZone[1]);
    let gap = xLength / options.xAxisLabel.length;

    //遍历两个年份
    for(let i = 0; i < data.length ;i++){
        let x,y,r,c;
        context.fillStyle = options.colorPool[i];
        c = options.colorPool[i];
        context.globalAlpha = 0.8;
        options.paintingData[i] = [];
        //遍历各个数据点
        for(let j = 0; j < data[i].length ; j++){
             x = options.chartZone[0] + xLength * data[i][j][0] / 70000;
             y = options.chartZone[3] - yLength * (data[i][j][1] - 55) / (85 - 55);

             //直接数值
             //r = data[i][j][2] * 5 / 100000000;
             //求对数
             //r = Math.log(data[i][j][2]);
             //开根号
             r = Math.pow(data[i][j][2],0.4) / 100;
             options.paintingData[i].push({
                  x,y,r,c
             });

             context.beginPath();
             context.arc(x, y , r , 0 , 2*Math.PI,false);
             context.fill();
             context.closePath();
        }
    }
}

/*简易hover效果*/
canvas.onmousemove = function (event) {
    let pos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
    let hoverPoint = checkHover(options, pos);
    /**
     * 如果当前有聚焦点
     */
    if (hoverPoint) {
        let samePoint = options.hoverData === hoverPoint ? true : false; 
        if (!samePoint) {
            resetHover();
            options.hoverData = hoverPoint;
        }
        paintHover();
    } else{
        //第一次尝试手动恢复
        resetHover();
        //使用离屏canvas恢复
        //resetHoverWithOffScreen();
    }
} 

/*检测是否hover在散点之上*/
function checkHover(options,pos) {
    let data = options.paintingData;
    let found = false;
    for(let i = 0; i < data.length; i++){
        found = false;
        for(let j = 0; j < data[i].length; j++){
            if (Math.sqrt(Math.pow(pos.x - data[i][j].x , 2) + Math.pow(pos.y - data[i][j].y , 2)) < data[i][j].r) {
                found = data[i][j];
                break;
            }
        }
        if (found) break;
    }
    return found;
}

/*绘制hover状态*/
function paintHover() {
    let {x,y,r,c} = options.hoverData;
    let step = 0.5;
    context.globalAlpha = 1;
    context.fillStyle = c;
    for(let i = 0 ; i < 30; i++){
       context.beginPath();
       context.arc(x,y,r + i * step, 0 , 2*Math.PI,false);
       context.fill();
       context.closePath();
    }
}

/*首次尝试的取消高亮状态的函数*/
function resetHover() {
    if (!options.hoverData) return;
    let {x,y,r,c} = options.hoverData;
    let step = 0.5;
    context.globalAlpha = 1;
    for(let i = 29; i>0; i--){
       context.save();
       //绘制外圆范围
       context.beginPath();
       context.arc(x,y,r + 30 * step, 0 , 2*Math.PI,false);
       context.closePath();
       //设置剪裁区域
       context.clip();
       //用全局背景色绘制剪裁区背景
       context.globalAlpha = 1;
       context.fillStyle = options.globalGradient;
       context.fill();
       //绘制内圆
       context.beginPath();
       context.arc(x,y,r + i * step, 0 , 2*Math.PI,false);
       context.closePath();
       context.fillStyle = c;
       context.globalAlpha = 0.8;
       //填充内圆
       context.fill();
       context.restore();
    }
    options.hoverData = null;
    console.log('清除hover效果');
}

//利用离屏canvas恢复hover前的状态
function  resetHoverWithOffScreen() {
    if (!options.hoverData) return;
    let {x,y,r,c} = options.hoverData;
    let step = 0.5;
    context.globalAlpha = 1;
    for(let i = 29; i>0; i--){
       context.save();
       //绘制外圆范围
       context.drawImage(canvas2, x - r - 30 * step, y - r - 30 * step , 2 * (r + 30 * step),2*(r + 30 * step),x - r - 30 * step, y - r - 30 * step , 2*(r + 30 * step),2*(r + 30 * step));
       //绘制内圆
       context.beginPath();
       context.arc(x,y,r + i * step, 0 , 2*Math.PI,false);
       context.closePath();
       context.fillStyle = c;
       context.globalAlpha = 0.8;
       //填充内圆
       context.fill();
       context.restore();
    }
    options.hoverData = null;
    console.log('清除hover效果');
}
