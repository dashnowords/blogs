/**
 * 获取canvas绘图上下文
 * @type {[type]}
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//绘图配置
let options = {
        chartZone:[50,50,1000,700],
        yAxisLabel:['0','100','200','300','400'],
        yMax:400,
        xAxisLabel:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
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

drawBarChart(options);

/**
 * 绘制柱状图
 */
function drawBarChart(options) {
    drawAxis(options); //绘制坐标轴
    drawYLabels(options); //绘制y轴坐标
    drawXLabels(options); //绘制x轴坐标
    //drawData(options);//绘制柱状图
    drawDataGradient(options);//绘制渐变色柱状图
    drawArrow(options);//绘制坐标轴箭头
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
        //绘制坐标文字
        let offset = context.measureText(label).width;
        context.strokeStyle = '#eaeaea';
        context.font = '18px';
        context.fillText(label, options.chartZone[0] + (index + 1) * gap - offset ,options.chartZone[3] + 20);
        //绘制小间隔
        context.beginPath();
        context.strokeStyle = '#353535';
        context.moveTo(options.chartZone[0] + (index + 1) * gap - offset / 2 ,options.chartZone[3]);
        context.lineTo(options.chartZone[0] + (index + 1) * gap - offset / 2,options.chartZone[3]+5);
        context.stroke();
        //存储偏移量
        options.offsetXLabel = offset / 2;
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

    //绘制矩形
    data.forEach(function (item, index) {
        context.fillStyle = options.barStyle.color || '#1abc9c'; //02BAD4
        let x0 = options.chartZone[0] + (index + 1) * gap - options.barStyle.width / 2 - options.offsetXLabel;
        let height = item / options.yMax * (options.chartZone[3] - options.chartZone[1])*0.98;
        let y0 =  options.chartZone[3] - height;
        let width = options.barStyle.width;
        context.fillRect(x0,y0,width,height);
    });
}

/**
 * 绘制线性渐变色柱状图
 */
function drawDataGradient(options) {
    let data = options.data;
    let xLength = (options.chartZone[2] - options.chartZone[0])*0.96;
    let yLength = (options.chartZone[3] - options.chartZone[1])*0.98;
    let gap = xLength / options.xAxisLabel.length;
    //创建渐变色
    let fillStyleGradient = context.createLinearGradient(50,50,50,700);
        fillStyleGradient.addColorStop(0, options.barStyle.color);
        fillStyleGradient.addColorStop(1, 'rgba(1,176,241,0.6)');

    //绘制矩形
    data.forEach(function (item, index) {
        context.fillStyle = fillStyleGradient;
        let x0 = options.chartZone[0] + (index + 1) * gap - options.barStyle.width / 2 - options.offsetXLabel;
        let height = item / options.yMax * (options.chartZone[3] - options.chartZone[1])*0.98;
        let y0 =  options.chartZone[3] - height;
        let width = options.barStyle.width;
        context.fillRect(x0,y0,width,height);
    });
}

/**
 * x轴绘制箭头
 */
function drawArrow(options) {
    let factor = options.axisArrow.size;
    context.save();
    context.translate(options.chartZone[2], options.chartZone[3]);
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(2 * factor,-3 * factor);
    context.lineTo(10 * factor,0);
    context.lineTo(2 * factor, 3 * factor);
    context.lineTo(0,0);
    context.fillStyle = options.axisArrow.color;
    context.globalAlpha = 0.7;
    context.fill();
    context.restore();
}

