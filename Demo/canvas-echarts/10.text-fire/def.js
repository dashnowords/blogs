let dt = 0.1;//每帧表示的时间间隔

//球体
class Ball{
    constructor(x,y,r,id){
        this.pos = new Vector2(x,y);//记录当前坐标
        this.id = id;
        this.color = '';
        this.r = r;
        this.velocity = null;
        this.life = true;
    }

    //更新粒子坐标
    update(){
        //重力加速度影响速度
        this.velocity = this.velocity.add(g.multiply(dt));
        //速度影响位移
        this.pos = this.pos.add(this.velocity.multiply(dt));
        //如果粒子已经出界则标记生命耗尽
        if(this.pos.y > 280){
            this.life = false;
        }
    }

    paint(){
        if(!this.life)return;
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.pos.x ,this.pos.y, this.r, 0, Math.PI * 2 , false);
        context.fill();
    }
}

class Timer{
    constructor(){
        this.lastTime = Date.now();
        this.label = new Date(this.lastTime).Format('hh:mm:ss');
        this.step = 0;
        this.shouldAnim = 0;
    }

    update(){
       this.step = (this.step + 1) % 60;
       this.shouldAnim = (this.shouldAnim + 1) % 120;
       if (!this.step) {
          this.lastTime = Date.now();
          this.label = new Date(this.lastTime).Format('hh:mm:ss');
       }
    }

    paint(ctx){
        context.fillStyle = "#353535";
        ctx.fillText(this.label, 200, 100);
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
