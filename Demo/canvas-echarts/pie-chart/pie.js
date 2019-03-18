/**
 * 获取canvas绘图上下文
 * @type {[type]}
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.height = 600;
canvas.width = 1000;

//基本绘图配置
let options = {
        chartZone:[50,50,1000,500],
        radius : [30, 120],
        center : ['25%', '50%'],
        data:[
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ],
        colorPool:['rgba(144,132,255,1)',
                   'rgba(60,178,239,1)',
                   'rgba(143,228,228,1)',
                   'rgba(174,253,202,1)',
                   'rgba(255,240,101,1)',
                   'rgba(255,174,139,1)',
                   'rgba(255,125,161,1)',
                   'rgba(254,206,255,1)'],
        highlightPool:[
                   'rgba(144,132,255,1)',
                   'rgba(60,178,239,1)',
                   'rgba(143,228,228,1)',
                   'rgba(174,253,202,1)',
                   'rgba(255,240,101,1',
                   'rgba(255,174,139,1)',
                   'rgba(255,125,161,1)',
                   'rgba(254,206,255,1)']
    }


//绘制饼图
drawPieChart(options);
    
/**
 * 绘制饼图
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function drawPieChart(options) {
   //计算扇形总数值
   options.maxValue = 0;
   options.totalNum = options.data.reduce((pre,cur)=>{
     if (cur.value > options.maxValue) {
         options.maxValue = cur.value;
     }
     return pre+cur.value;
   },0);
    //以最大值对应最大半径来计算参考面积的R
    let Rmin = options.radius[0];
    let Rmax = options.radius[1];
    let r = Math.sqrt((Rmax*Rmax - Rmin*Rmin)*options.totalNum / options.maxValue + Rmin*Rmin);
    options.radius[1] = r;
    //移动坐标系原点至绘图中心
   let paintingCenter={
     x:parseInt(options.center[0],10)/100 * (options.chartZone[2] - options.chartZone[0]) + options.chartZone[0],
     y:parseInt(options.center[1],10)/100 * (options.chartZone[3] - options.chartZone[1]) + options.chartZone[1]
   }
   context.translate(paintingCenter.x, paintingCenter.y);
    //绘制每个扇形,过程中累加旋转角度
   let allAngle = options.data.reduce((prev,cur,index)=>{
       context.fillStyle = options.colorPool[index]
       let angle = calcPaintingData(cur,options);
       return prev + angle;
   },0);

   //绘制中空白色圆
   context.beginPath();
   context.fillStyle = 'white';
   context.arc(0,0,options.radius[0],0,2*Math.PI,false);
   context.fill();
}

/**
 * 计算绘制第index片扇形所需要的参数
 */
function calcPaintingData(data,options) {
    let scale = data.value / options.totalNum; 
    let angle = scale * 2 * Math.PI;
    let Rmin = options.radius[0];
    let Rmax = options.radius[1];
    let r = Math.sqrt(scale * (Rmax*Rmax - Rmin*Rmin) + Rmin*Rmin);
    data.r = r;
    //绘制第index块扇形
    paintFan({
        r:r,
        angle:angle,
        data:data,
        options:options
    });
    return angle;//将角度值返回给外层函数以供累加
}

function paintFan(opt) {
    context.beginPath();
    context.lineTo(opt.r,0);
    context.arc(0,0,opt.r,0,opt.angle,false);
    context.lineTo(0,0);
    context.closePath();
    context.fill();
    context.rotate(opt.angle);
}
