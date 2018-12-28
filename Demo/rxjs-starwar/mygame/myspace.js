/**
 * 背景
 * 扩展思考：如何融入全屏resize事件来自动调整星空
 */
//将全屏初始化为画布舞台
let canvas = document.getElementById('canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.style.backgroundColor = 'black';
let ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
let spaceShipImg = new Image();
    spaceShipImg.src = 'plane2.png';

//生成星空
//每个数据点希望得到的数据形式是[{x:1,y:1,size:1},{}]
let starStream = Rx.Observable.range(1,250)
.map(function(data){
   return {
      x:Math.ceil(Math.random()*canvas.width),
      y:Math.ceil(Math.random()*canvas.height),
      size: Math.ceil((Math.random()*4))
   }
})
.toArray()
.flatMap(function(stars){
    /*此处是默写时的难点，静态生成的数组流需要一直保持
    *后续的结果都是在此之上不断累加的
    */
    return Rx.Observable.interval(40).map(function () {
        stars.forEach(function (star) {
            star.y = (star.y+2)  % canvas.height; 
        });
        return stars;
    })
})
/*.subscribe(function(stars){
    paintStar(stars);
})*/

//绘制星空
function paintStar(stars){
    //暴力清屏，如果不清除则上次的星星不会被擦除
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFFFFF';
    //绘制星星
    stars.forEach(function (star) {  
        ctx.fillRect(star.x, star.y, star.size, star.size); 　
    });
}

