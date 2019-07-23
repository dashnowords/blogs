/*
* 初始化环境部分
*/

AMBIENT_LIGHT = 0x3498db; //环境光
mats = [];//初始化视频贴图数组


//初始化渲染器
function initRender() {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

//初始化相机
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, 1.5, 0.1, 1000);
    camera.position.set(0,3,5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

//初始化正交相机
function initOrthCamera() {
    camera = new THREE.OrthographicCamera( window.innerWidth / - 10, window.innerWidth / 10, window.innerHeight / 10, window.innerHeight / - 10, 1, 1000);
    camera.position.set(0,0,10);
    //camera.lookAt(new THREE.Vector3(100, 0, 0));
}

//初始化场景
function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3a0d14);
}

//初始化灯光
function initLight(color) {
  //添加环境光
  ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);
}

//重复渲染
function render() {
    controls.update();
    mockCameraTrack();
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}

//初始化音频
function initAudio() {
   listener = new THREE.AudioListener();
   
   // create a global audio source
   sound = new THREE.Audio( listener );

   // load a sound and set it as the Audio object's buffer
   audioLoader = new THREE.AudioLoader();
   audioLoader.load( 'http://localhost:3333/assets/audio.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 0.8 );
        window.sound = sound;
    });
}

//将音频与相机关联
function addAudio(params) {
    camera.add( listener );
    sound.play();
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
