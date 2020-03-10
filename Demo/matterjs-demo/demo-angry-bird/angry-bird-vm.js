function AngryBirdVM(canvas) {
    //创建舞台
    var stage = new createjs.Stage(canvas);

    //创建弹弓
    var slingshot = {
        images: ["../assets/env.png"],
        frames: [
            [185, 193, 44, 126, 0], // 弹弓左半边
            [0, 0, 42, 200, 0], // 弹弓右半边
            [42, 0, 82, 200, 0] // 受力的弹弓
        ],
        animations: {
            left: [0],
            right: [1],
            bendover: [2]
        }
    };

    var slingshotSprite = new createjs.SpriteSheet(slingshot);
    var shotShapeL = new createjs.Sprite(slingshotSprite, "left");
    shotShapeL.scaleX = 0.5;
    shotShapeL.scaleY = 0.5;
    shotShapeL.x = 206;
    shotShapeL.y = 330;
    shotShapeL.visible = false;
    var shotShapeR = new createjs.Sprite(slingshotSprite, "right");
    shotShapeR.scaleX = 0.5;
    shotShapeR.scaleY = 0.5;
    shotShapeR.x = 221;
    shotShapeR.y = 330;
    shotShapeR.visible = false;
    var shotShapeB = new createjs.Sprite(slingshotSprite, "bendover");
    shotShapeB.scaleX = 0.5;
    shotShapeB.scaleY = 0.5;
    shotShapeB.x = 195;
    shotShapeB.y = 330;
    shotShapeB.visible = true;

    //创建小鸟
    var bird = {
        images: ["../assets/bird.png"],
        frames: { width: 124, height: 120, count: 4, regX:62, regY:60 },
        animations: {
            play: {
                frames: [0, 1, 2, 3],
                speed: 0.05
            }
        }
    };

    var birdSprite = new createjs.SpriteSheet(bird);
    var birdShape = new createjs.Sprite(birdSprite, "play");
    birdShape.scaleX = 0.3;
    birdShape.scaleY = 0.3;

    //添加至舞台
    stage.addChild(shotShapeB, shotShapeL, birdShape, shotShapeR);

    //创建物体堆
    var stacks = {
        images: ["../assets/env.png"],
        frames: [
            [418, 520, 86, 86, 0, 43, 43], // 木箱子
            [418, 606, 86, 86, 0, 43, 43], // 铁箱子
            [507, 436, 86, 86, 0, 43, 43] // 石头
        ],
        animations: {
            wood: [0],
            iron: [1],
            rock: [2]
        }
    };

    //与matterjs中保持一致即可
    //0为地面，1为小鸟，2-12为石头，13-18为木头，19-22为铁块
    //待matterjs中物理模型建立后进行坐标同步，然后将渲染模型展示出来
    var stacksSprite = new createjs.SpriteSheet(stacks);
    var stack;
    for (var i = 0; i < 21; i++) {
        if (i <= 10) {//石头
            stack = new createjs.Sprite(stacksSprite, "iron");
        } else if (i > 10 && i <= 16) {//木头
            stack = new createjs.Sprite(stacksSprite, "wood");
        } else if (i == 20){ // 铁块
            stack = new createjs.Sprite(stacksSprite, "iron");
        } else{
            stack = new createjs.Sprite(stacksSprite, "rock");
        }
        stack.visible = false;
        stage.addChild(stack);
    }

    //创建敌军猪头
     var pig = {
        images: ["../assets/pig.png"],
        frames: { width: 96, height: 86, count: 5, regX:48, regY:43},
        animations: {
            play: {
                frames: [0, 1, 2, 3],
                speed: 0.05
            }
        }
    };

    var pigSprite = new createjs.SpriteSheet(pig);
    //添加3个敌人
    for(var i = 0; i < 3; i++){
        var pigShape = new createjs.Sprite(pigSprite, "play");
        pigShape.scaleX = 0.4;
        pigShape.scaleY = 0.4;
        stage.addChild(pigShape);
    }

    //创建弹弓皮筋
    var band1 = new createjs.Shape();
       band1.graphics.beginStroke('red').moveTo(200,300).lineTo(200,340);
    

    return stage
}
