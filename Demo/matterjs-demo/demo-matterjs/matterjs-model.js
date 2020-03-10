var Example = Example || {};
var ejectDistance = 3;

Example.slingshot = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
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
            wireframes:false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // 地面
    var ground = Bodies.rectangle(511, 444, 1022, 10, { isStatic: true }),
    
    // 小鸟
    birdOptions = { mass: 10, restitution:0.6},
        bird = Bodies.circle(200, 340, 16, birdOptions),
        anchor = { x: 200, y: 340 },
        elastic = Constraint.create({ 
            pointA: anchor, 
            bodyB: bird, 
            length:1,
            stiffness: 0.25
        });


    // 低处物体堆
    var pyramid = Composites.pyramid(600, 290, 9, 8, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 30, 30);
    });

    // 高处物体堆
    var ground2 = Bodies.rectangle(710, 150, 180, 10, { isStatic: true });

    var pyramid2 = Composites.pyramid(650, 20, 5, 10, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 30, 30);
    });

    World.add(engine.world, [ground, pyramid, ground2, pyramid2, bird, elastic]);

    // 每帧更新后
    Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (bird.position.x > (200+ejectDistance) || bird.position.y < (340 - ejectDistance))) {
            bird = Bodies.circle(200, 340, 16, birdOptions);
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
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};