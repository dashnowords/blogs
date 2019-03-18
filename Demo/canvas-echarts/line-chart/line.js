/**
 * 获取canvas绘图上下文
 * @type {[type]}
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//基本绘图配置
let options = {
        chartZone:[50,50,1000,700],
        yAxisLabel:['0','100','200','300','400'],
        yMax:400,
        xAxisLabel:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        xAxisPos:[],//用于暂存x坐标轴标签的位置
        data:[10,50,200,330,390,320,220],
        barStyle:{
            width:70,
            color:'#1abc9c'
        },
        axisArrow:{
            size:2,
            color:'#DA5961'
        }
    }

drawLineChart(options);

/**
 * 绘制柱状图
 */
function drawLineChart(options) {
    drawAxis(options); //绘制坐标轴
    drawYLabels(options); //绘制y轴坐标
    drawXLabels(options); //绘制x轴坐标
    //drawData(options);//绘制折线图
    drawDataWithCubicBezier(options);//贝塞尔曲线拟合
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
    let yLength = (options.chartZone[3] - options.chartZone[1])*0.98;
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
        //绘制辅助线
        context.beginPath();
        context.strokeStyle = '#eaeaea';
        context.strokeWidth = 2;
        context.moveTo(options.chartZone[0], options.chartZone[3] - index * gap);
        context.lineTo(options.chartZone[2], options.chartZone[3] - index * gap);
        context.stroke();
    });
}

/**
 * 绘制x轴坐标
 */
function drawXLabels(options) {
    let labels = options.xAxisLabel;
    let xLength = (options.chartZone[2] - options.chartZone[0])*0.96;
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
    let xLength = (options.chartZone[2] - options.chartZone[0])*0.96;
    let yLength = (options.chartZone[3] - options.chartZone[1])*0.98;
    let gap = xLength / options.xAxisLabel.length;
    let yFactor =(options.chartZone[3] - options.chartZone[1]) *0.98  /  options.yMax 
    let activeX =  0;//记录绘制过程中当前点的坐标
    let activeY =  0;//记录绘制过程中当前点的y坐标
    context.strokeStyle = options.barStyle.color || '#1abc9c'; //02BAD4
    context.strokeWidth = 2;
    context.beginPath();
    context.moveTo(options.chartZone[0],options.chartZone[3]);//先将起点移动至0,0坐标
    for(let i = 0; i < data.length; i++){
        activeX = options.chartZone[0] + (i + 1) * gap;
        activeY = options.chartZone[3] - data[i] * yFactor;
        context.lineTo(activeX, activeY);
     }
     context.stroke();
    }

/**
 * 绘制数据
 */
function drawDataWithCubicBezier(options) {
    let drawingPoints = calcControlPoints(options);
    context.strokeStyle = options.barStyle.color || '#1abc9c'; //02BAD4
    context.strokeWidth = 4;
    context.beginPath();
    context.moveTo(options.chartZone[0],options.chartZone[3]);//先将起点移动至0,0坐标
    //逐个连接相邻坐标点
    for(let i = 1; i < drawingPoints.length; i++){
       context.bezierCurveTo(drawingPoints[i-1].cp1x, drawingPoints[i-1].cp1y, drawingPoints[i-1].cp2x, drawingPoints[i-1].cp2y, drawingPoints[i].dx, drawingPoints[i].dy);
    }
    //绘制线条
    context.stroke();
    }

/**
 * 计算控制点
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function calcControlPoints(options) {
    let results = [];
    let y = options.data;
    let x = options.xAxisPos;
    //补充左值
    y.unshift(y[0]);
    x.unshift(0);
    //补充右值
    x.push(x[y.length - 1]);
    x.push(x[y.length - 1]);
    y.push(y[y.length - 1]);
    y.push(y[y.length - 1]);
    //计算用于绘制曲线的坐标点及控制点坐标值
    for(let i = 1; i < y.length - 2; i++){
        results.push({
            dx:transToCanvasCoord(x[i], 'x'),
            dy:transToCanvasCoord(y[i]),
            cp1x:transToCanvasCoord(x[i] + (x[i+1] - x[i-1]) / 4,'x'),
            cp1y:transToCanvasCoord(y[i] + (y[i+1] - y[i-1]) / 4),
            cp2x:transToCanvasCoord(x[i+1] - (x[i+2] - x[i]) / 4,'x'),
            cp2y:transToCanvasCoord(y[i+1] - (y[i+2] - y[i]) / 4),
        })
    }
    console.log(results)
    return results;
}

/**
 * 将坐标转换为相对canvas的坐标
 * @param  {[type]} coord 相对于可视坐标系的值
 * @param  {[type]} flag  标记转换x坐标还是y坐标
 * @return {[type]}       [description]
 */
function transToCanvasCoord(coord,flag) {
    let xLength = (options.chartZone[2] - options.chartZone[0])*0.96;
    let yLength = (options.chartZone[3] - options.chartZone[1])*0.98;
    let yFactor =(options.chartZone[3] - options.chartZone[1]) *0.98  /  options.yMax;
    if (flag === 'x') {
        return coord + options.chartZone[0];
    }
    return options.chartZone[3] - coord * yFactor;
}

