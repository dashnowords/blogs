## Demo说明

示例为`express`工程，由于加载字体文件和外部模型时需要从服务端加载，所以需要从本地服务器查看，在当前目录执行`npm install`或`yarn`安装依赖，然后使用`npm run start`或`yarn start`启动服务，在`localhost:3334`端口即可访问本地服务器，本示例中需要手动输入`html`地址：

- `index.html`-演示先生成平面图形再生成拉伸体的过程
- `index_bsp.html`-演示`ThreeCSG.js`库的使用（库本身有问题）
- `index_loader.html`-演示加载外部`gltf`模型

