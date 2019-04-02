/**
 * 获取canvas绘图上下文
 * @type {[type]}
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//基本绘图配置
let options = {
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '销售（sales）', max: 6500},
           { name: '管理（Administration）', max: 16000},
           { name: '信息技术（Information Techology）', max: 30000},
           { name: '客服（Customer Support）', max: 38000},
           { name: '研发（Development）', max: 52000},
           { name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '预算分配（Allocated Budget）'
            },
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际开销（Actual Spending）'
            }
        ]
    }]
};

start(options);

/**
 * 绘制图表
 */
function start(options) {
    drawBg(options);
    drawData(options);//绘制雷达图
    drawText(options);//绘制文字
}

function drawBg(options) {
    let length = options.radar.indicator.length;
    let angleStep = -2 * Math.PI / length;
    context.strokeStyle="#b2b2b2";
    context.lineWidth = 1;
    //调整坐标系
    context.translate(500,300);
    context.rotate(-90 * 2 * Math.PI / 360);
    //每次以不同旋转半径绘制多个由大到小的图形
    for(let r = 200; r > 0 ; r -=40){
        //移动至第一个绘图点
        context.save();
        context.beginPath();
        context.moveTo(r,0);
        
        //转动坐标系绘制所有点
         for(let i = 0; i < length; i++){
            context.rotate(angleStep);
            context.lineTo(r,0);
         }
         context.closePath();
        context.stroke();
        context.fillStyle = Math.round(r / 40) % 2 ? 'white':'#eaeaea';
        context.fill();
        context.restore();
    }
}

/**
 * 绘制数据
 */
function drawData(options) {
   let {radar:{indicator:indicators},series:[{data:data}]} = options;
   let colors = ['#c43e3a','#364c5a'];
   let length = indicators.length;
   let angleStep = -2 * Math.PI / length;

   for(let i = 0; i < data.length; i++){
       
       context.save();
       context.beginPath();
       context.moveTo(200 * data[i].value[0] / indicators[0].max,0);
    
       //遍历每组数据
       for(let j = 1; j < data[i].value.length; j++){
           context.rotate(angleStep);
           context.lineTo(200 * data[i].value[j] / indicators[j].max,0);
       }
       context.restore();
       context.lineTo(200 * data[i].value[0] / indicators[0].max,0);
       context.strokeStyle = colors[i];
       context.lineWidth = 2;
       context.stroke();
   }
   context.restore();
}

//绘制文字
function drawText(options) {
   let {radar:{indicator:indicators}} = options;
   let length = indicators.length;
   let angleStep = 2 * Math.PI / length;
   let r = 220;
   context.fillStyle = 'black';
   context.font = "14px bold 黑体";
   context.textAlign = 'center';
   context.rotate(90 * Math.PI * 2 / 360);
   for(let i = 0; i < indicators.length; i++){
     let curAngle = -90*2*Math.PI/360 - angleStep*i;
       //根据方向调整文字的对齐点
     let cos = Math.cos(curAngle);
     if (Math.abs(cos) < 10e-4) {
        context.textAlign = 'center';
     }else if(cos > 0){
        context.textAlign = 'left';
     }else{
        context.textAlign = 'right';
     }
      context.fillText(indicators[i].name, r * Math.cos(curAngle), r * Math.sin(curAngle));
   }
}

