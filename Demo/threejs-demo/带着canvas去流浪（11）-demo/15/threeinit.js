AMBIENT_LIGHT = 0x3498db; //环境光
initScene();
initRender();
initCamera();
initLight(AMBIENT_LIGHT);
initControls();

//初始化渲染器
function initRender() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1500, 800);
    document.body.appendChild(renderer.domElement);
    //设置背景
    renderer.setClearColor(0xffffff, 1.0);
    //生成阴影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    
}

//初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
    camera.position.set(0,40,100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

//初始化场景
function initScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x00ff00,10,100);
}

//初始化灯光
function initLight(color) {
  //添加环境光
  ambientLight = new THREE.AmbientLight(0xda5961)
  scene.add(ambientLight);

  //添加平衡光
  light = new THREE.DirectionalLight( 0xffffff );
  light.castShadow = true;
  light.shadow.camera.near = 0.1;    // default
  light.shadow.camera.far = 1000;     // default
  light.shadow.camera.left= -5;     // default
  light.shadow.camera.top= 10;     // default
  light.position.set(60,30,0);
  scene.add(light);
}

//重复渲染
function render() {
    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}

function initControls() {

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance  = 200;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 600;
    //是否开启右键拖拽
    controls.enablePan = true;
}
