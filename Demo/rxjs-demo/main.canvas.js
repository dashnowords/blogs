/**
 * 角色类
 */
class Bird{
    constructor(ctx,img){
        this.ctx = ctx;
        this.img = img; 
        this.pos = [0,0];
        this.step = 68
        this.index = 0;
        this.ratio = 4;
    }

    //更新自身状态
    update(){
        if (!(this.index++ % this.ratio)) {   
           this.pos[1] = this.pos[1] === 748 ? 0 : this.pos[1] + this.step;
        }
    }

    //绘制
    paint(){
       this.ctx.drawImage(this.img, this.pos[0] , this.pos[1] , 54 ,  64 , 120 , 304, 54, 64);
    }
}

/**
 * 背景类
 */
class Background{
    constructor(ctx,img){
        this.ctx = ctx;
        this.img = img; 
        this.arrayLen = 8;
        this.index = 0;
        this.ratio = 1.6;
    }

    //更新自身状态
    update(){
       this.index = parseInt((this.index + this.ratio),10) % 800;
    }

    //绘制
    paint(){
        let delta = 92;
       //绘制左半部分
       this.ctx.drawImage(this.img , this.index + delta , 0 , 800 + delta - this.index , 576 , 0 , 0 , 800 + delta - this.index , 400);
       //绘制右半部分
       this.ctx.drawImage(this.img , delta, 0 , this.index , 576 , 800 - this.index , 0 , this.index , 400);
    }
}

/**
 * 动画框架
 */
let spirits = [];
function startCanvasAnimation(){
    let background = new Background(ctx1,bgImg);
    let bird = new Bird(ctx1,roleImg);
    spirits.push(background);
    spirits.push(bird);
    return requestAnimationFrame(paint)
}

//每个绘制周期重复调用的绘制函数
function paint() {
    for(let spirit of spirits){
        spirit.update();
        spirit.paint();
    }
    return requestAnimationFrame(paint);
}


startCanvasAnimation();
