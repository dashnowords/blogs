let dt = 0.005;//每帧表示的时间间隔
let kv = 0.5;//速度与偏移距离的关系系数  v = kx
let resetDistance = 5;//复位阈值
let minV = 20;//最小接近速度
//粒子
class Particle{
    constructor(x,y){
        this.pos0 = new Vector2(x,y);//记录初始坐标
        this.pos = new Vector2(x,y);//记录当前坐标
        this.r = 1;
        this.life = 0;//粒子生命值
        this.force = null;//粒子受力
        this.quantity = 20;
        this.velocity = null;//粒子的速度
    }

    //更新状态
    update(){

        let nextPos;//模拟下一次落点

        //和初始点距离
        const disV = this.pos0.subtract(this.pos);//当前位置到回归点的向量
        const disL = disV.length();

        //1.计算速度，并模拟下一次落点
        this.velocity = disV.multiply(kv * disL < minV ? minV : kv * disL);
        nextPos = this.pos.add(this.velocity.multiply(dt)); 

        //2.判断下一次落点是否和当前爆破范围碰撞
        const disToE = nextPos.subtract(explodeCenter); //爆破中心指向当前点的向量
        const disToEL = disToE.length();
        const disVnext = this.pos0.subtract(nextPos);//下一次落点距离回归点的向量
        const disLnext = disVnext.length();
        
        if (disToEL < explodeR) {
              //2.1 如果下一次落点会落在当前爆炸中心的范围内则处理
              nextPos = explodeCenter.add(disToE.normalize().multiply(explodeR * 1.05));
        }else{
              //2.2 如果下一次落点可被回收则回收
            if (disLnext < resetDistance ) {
                this.pos = this.pos0;
                return;
            }
        }

        //3.确认更新位置
        this.pos = nextPos;      
    }
}


//二维向量定义
Vector2 = function(x, y) { this.x = x; this.y = y; };
Vector2.prototype = {
    copy: function() { return new Vector2(this.x, this.y); },
    length: function() { return Math.sqrt(this.x * this.x + this.y * this.y); },
    sqrLength: function() { return this.x * this.x + this.y * this.y; },
    normalize: function() { var inv = 1 / this.length(); return new Vector2(this.x * inv, this.y * inv); },
    negate: function() { return new Vector2(-this.x, -this.y); },
    add: function(v) { return new Vector2(this.x + v.x, this.y + v.y); },
    subtract: function(v) { return new Vector2(this.x - v.x, this.y - v.y); },
    multiply: function(f) { return new Vector2(this.x * f, this.y * f); },
    divide: function(f) { var invf = 1 / f; return new Vector2(this.x * invf, this.y * invf); },
    dot: function(v) { return this.x * v.x + this.y * v.y; }
};
