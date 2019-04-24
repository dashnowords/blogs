define('business2',['jQuery'],function(){
    console.log(`执行business2模块工厂方法`);
    let welcome = function(){
        $('#welcome-modal').animate({opacity:1},1500);
    }
    return {welcome};
});