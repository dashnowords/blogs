var Example = Example || {};
var ejectDistance = 3;
const HEIGHT = 446
const WIDTH = 1022

Example.slingshot = function () {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1022,
            height: 446,
            background: "url('assets/bg.png')",
            wireframeBackground:'#fff',
            wireframes: false,
            showVelocity:true,
            showCollitions:true
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // 地面
    var ground = Bodies.rectangle(511, 444, 1022, 10, { isStatic: true }),

        // 小鸟
        birdOptions = { mass: 20, restitution: 0.6 },
        bird = Bodies.circle(200, 350, 16, birdOptions),
        anchor = { x: 200, y: 350 },
        elastic = Constraint.create({
            pointA: anchor,
            bodyB: bird,
            length: 0.01,
            stiffness: 0.25,
            render:{
                strokeStyle:'black'
            }
        });

    //怪物堆
    var woodOptions = { mass: 2, isStatic:false, restitution:0, friction:0.4}
    var rockOptions = { mass: 4, isStatic:false, restitution:0, friction:0.5}
    var ironOptions = { mass: 6, isStatic:false, restitution:0, friction:0.2}
    var stacks = [];
    //石头1
    stacks[0] = Bodies.rectangle(450, HEIGHT - 42, 30, 70, rockOptions);
    stacks[1] = Bodies.rectangle(485, HEIGHT - 88, 80, 20, rockOptions);
    stacks[2] = Bodies.rectangle(520, HEIGHT - 42, 30, 70, rockOptions);
    //石头2
    stacks[3] = Bodies.rectangle(620, HEIGHT - 58, 28, 100, rockOptions);
    stacks[4] = Bodies.rectangle(650, HEIGHT - 119, 80, 20, rockOptions);
    stacks[5] = Bodies.rectangle(680, HEIGHT - 58, 28, 100, rockOptions);
    //石头3
    stacks[6] = Bodies.rectangle(780, HEIGHT - 82, 20, 150, rockOptions);
    stacks[7] = Bodies.rectangle(800, HEIGHT - 82, 20, 150, rockOptions);
    stacks[8] = Bodies.rectangle(850, HEIGHT - 168, 150, 20, rockOptions);
    stacks[9] = Bodies.rectangle(900, HEIGHT - 82, 20, 150, rockOptions);
    stacks[10] = Bodies.rectangle(920, HEIGHT - 82, 20, 150, rockOptions);
    //木头1
    stacks[11] = Bodies.rectangle(570, HEIGHT - 28, 20, 40, woodOptions);
    stacks[12] = Bodies.rectangle(570, HEIGHT - 58, 60, 20, woodOptions);
    //木头2
    stacks[13] = Bodies.rectangle(730, HEIGHT - 28, 20, 40, woodOptions);
    stacks[14] = Bodies.rectangle(730, HEIGHT - 58, 60, 20, woodOptions);
    //木头3
    stacks[15] = Bodies.rectangle(900, HEIGHT - 194, 30, 30, woodOptions);
    stacks[16] = Bodies.rectangle(840, HEIGHT - 220, 120, 10, woodOptions);
    //铁块1
    stacks[17] = Bodies.rectangle(485, HEIGHT - 138, 30, 80, ironOptions);
    stacks[18] = Bodies.rectangle(485, HEIGHT - 194, 30, 30, ironOptions);
    //铁块2
    stacks[19] = Bodies.rectangle(650, HEIGHT - 170, 30, 80, ironOptions);
    stacks[20] = Bodies.rectangle(570, HEIGHT - 220, 220, 20, ironOptions);
    //猪头1
    stacks[21] = Bodies.circle(570, 358, 20, ironOptions)
    //猪头2
    stacks[22] = Bodies.circle(730, 362, 16, ironOptions)
    //猪头3
    stacks[23] = Bodies.circle(570, 196, 20, ironOptions)

    World.add(engine.world, [ground, bird, ...stacks, elastic]);

    // 每帧更新后
    Events.on(engine, 'afterUpdate', function () {
        if (mouseConstraint.mouse.button === -1 && (bird.position.x > (200 + ejectDistance) || bird.position.y < (350 - ejectDistance))) {
            bird = Bodies.circle(200, 350, 16, birdOptions);
            World.add(engine.world, bird);
            elastic.bodyB = bird;
        }
    });

    //鼠标约束
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 1022, y: 446 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function () {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};