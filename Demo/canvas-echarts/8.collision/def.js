let dt = 0.5;//每帧表示的时间间隔

//球体
class Ball{
    constructor(x,y,id){
        this.pos = new Vector2(x,y);//记录当前坐标
        this.id = id;
        this.color = '';
        this.r = 20;
        this.velocity = null;
    }

    /*更新状态
    由于检测碰撞需要知道其他小球的位置，故此处将小球数组的引用传入
    也可以直接以面向对象的方式来定义*/
    update(index,balls){

        let nextPos;//模拟下一次落点

        //1.计算下一次落点
        nextPos = this.pos.add(this.velocity.multiply(dt)); 

        //2.判断新位置是否碰触边界，如果是则边界法向的速度反向，假设碰撞过程是无能量损失
        if (nextPos.x + this.r > rightBorder || nextPos.x < this.r) {
            this.velocity.x = -1 * this.velocity.x;
            nextPos = this.pos;
        } 
        if (nextPos.y + this.r > bottomBorder || nextPos.y < this.r) {
            this.velocity.y = -1 * this.velocity.y;
            nextPos = this.pos;
        }

        //3.判断是否与其他小球产生碰撞
        balls.map(ball=>{
           if (ball.id > index && this.checkCollision(ball)) {
               this.handleCollision(ball);
           }
           return ball;
        });
       
        //4.确认更新位置
        this.pos = nextPos;      
    }
    paint(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.pos.x ,this.pos.y, this.r, 0, Math.PI * 2 , false);
        context.fill();
    }
    //检测碰撞
    checkCollision(ball){
       return this.pos.subtract(ball.pos).length() < this.r + ball.r;
    }
    //处理碰撞
    handleCollision(ball){
        let ballToThis = this.pos.subtract(ball.pos).normalize();
        let thisToBall = ballToThis.negate();
        this.velocity = ballToThis.multiply(Math.abs(ball.velocity.length()*(ball.velocity.dot(ballToThis) / ball.velocity.length())));
        ball.velocity = thisToBall.multiply(Math.abs(this.velocity.length()*(this.velocity.dot(ballToThis) / this.velocity.length())));
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
