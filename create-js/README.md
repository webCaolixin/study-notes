## CreateJS 入门

### 什么是CreateJS

> [官网介绍](https://www.createjs.com/) （[中文](http://www.createjs.cc/)）：CreateJS 是一组模块化代码库和工具套件，可以独立工作也可以组合工作，用于通过HTML5技术来在网页上开发丰富的交互式内容。

### 四个核心库

CreateJS主要包含如下四个类库：
* `EaselJS` – 简化处理HTML5画布（核心）
* `TweenJS` – 用来帮助设计H5动画，调整HTML5属性
* `SoundJS` – 用来简化处理HTML5 audio 音频
* `PreloadJS` – 帮助管理和协调加载中的一些资源

**今天，主要来了解一下 `EaselJS` 库**

### EaselJS
![EaselJS][1]

#### EaselJS 简介
> `EaselJS` 是一个JavaScript库,用来简单快捷的操作 `HTML5 Canvas` 标签。在创建H5游戏，生成艺术作品、处理其他高级图形化等工作中有着很友好的体验。

#### EaselJS中的一些核心类
1. `Stage Class` -- 创建舞台
2. `Text Class` -- 绘制文字
3. `Graphics Class` -- 绘制图形
4. `Shape Class` -- 绘制图形
5. `Bitmap Class` -- 绘制图片
6. `Ticker Class` -- 定时广播
7. ......等

### 一些"栗子"

#### 绘制文本(Text Class)
定义一个`<canvas> </canvas>` 画布。
```
// HTML:
<!-- Text Class 文本类-->
<canvas id="demo1" width="650" height="400"></canvas>
```

调用`EaselJS`提供的`API - new createjs.Text()`，绘制文字
```
// JS
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script>
  window.onload = () => {
    /**
      * Test Class 文本类 -- demo
      */
    let stage1 = new createjs.Stage("demo1");

    let text1 = new createjs.Text("Text 1 !", "bold 26px Arial", "#ff7700");
    text1.regX = -50;     // 沿X轴负方向的偏移量
    text1.regY = -50;     // 沿Y轴负方向的偏移量
    text1.x = 100;        // 绘制源点 X坐标
    text1.y = 50;         // 绘制源点 Y坐标

    let text2 = new createjs.Text("旋转+XY拉伸！", "bold 18px Arial", "#ff7700");
    text2.x = 50;
    text2.y = 50;
    text2.rotation = 50;      // 旋转角度 DEG
    text2.scaleX = 3;         // X轴放大(拉伸)
    text2.scaleY = 2;         // X轴放大(拉伸)

    let text3 = new createjs.Text("XY轴倾斜", "bold 50px Arial", "#ff7700");
    text3.x = 300;
    text3.y = 200;
    text3.skewX = 45;         // X轴倾斜角度 DEG
    text3.skewY = 20;         // Y周倾斜角度 DEG

    let text4 = new createjs.Text("文字shadow", "bold 30px Arial", "#ff7700");
    text4.x = 400;
    text4.y = 100;
    text4.shadow = new createjs.Shadow("#000000", 5, 5, 10);      // 创建一个shadow实例Object

    stage1.addChild(text1, text2, text3, text4);
    stage1.update();    // 更新舞台，每次修改操作后需要更新真个舞台才有效果
  }
</script>
```

#### 绘制图形(Graphics Class)
定义一个`<canvas> </canvas>` 画布。
```
// HTML:
<!-- Graphics Class 文本类-->
<canvas id="demo2" width="650" height="400"></canvas>
```

调用`EaselJS`提供的`API - new createjs.Graphics()`，绘制图形
```
// JS
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script>
  window.onload = () => {
    /**
      * Graphics Class 绘图类 -- demo
      * 用于生成矢量绘图指令
      */
    let stage2 = new createjs.Stage('demo2')

    // 画线
    let g = new createjs.Graphics();
    /* 同一个 Graphics 实例， 可以多次绘制，以下线段、折线都是用 g 实例绘制的*/
    g.setStrokeStyle(10).beginStroke("#d23c4f").moveTo(400,10).lineTo(600,100)
    // 简写形式
    g.ss(20).s('#fafa35').mt(400,100).lt(400,260)
    // 多点折线的简写形式
    g.ss(1).s('#000').mt(600,400).lt(600, 200).lt(400,300).lt(500, 550)

    // Graphics 实例不能直接 addChild() 到舞台 stage 中，实例化为 Shape 实例后才可以
    let line = new createjs.Shape(g)

    // 圆
    let g1 = new createjs.Graphics();
    g1.setStrokeStyle(1);         // 描边
    g1.beginStroke("#000000");    // 描边颜色
    g1.beginFill("red");          // 图形填充
    g1.drawCircle(0,0,100);        // 绘制 (X, X, R)
    let c1 = new createjs.Shape(g1)     // 实例化Shape对象

    // 矩形
    let g2 = new createjs.Graphics().beginStroke("red").beginFill("blue").drawRect(150, 0, 200, 100);     // X, Y, W, H
    let c2 = new createjs.Shape(g2)

    // 命令对象
    let g3 = new createjs.Graphics();
    // 每个图形接口调用后会生成一个命令对象，可以使用.command访问，它保存对已创建或附加的最后一个命令的引用
    let fillCommand = g3.beginFill("green").command;
    g3.drawCircle(200,200,50);        // 绘制 (X, X, R)
    let c3 = new createjs.Shape(g3);

    // 一些异步操作后，更新填充样式/颜色:
    setTimeout(() => {
      fillCommand.style = "gray";
      stage2.update();                // 不更新舞台，不会重新渲染
    }, 2000);

    // 点击事件
    //c3.addEventListener('click', () => {
    // alert(123)
    // fillCommand.style = "gray";
    // stage2.update();          // 不更新舞台，不会重新渲染
    //})
  
    stage2.addChild(c1, c2, c3, line);
    stage2.update();
  }
</script>
```

#### 绘制图像imgaes(Bitmap Class)
定义一个`<canvas> </canvas>` 画布。
```
// HTML:
<!-- Bitmap Class 图像类-->
<canvas id="demo3" width="650" height="400"></canvas>
```

调用`EaselJS`提供的`API - new createjs.Bitmap()`，绘制图像
```
// JS
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script>
  window.onload = () => {
    /**
      * bitmap Class 图像类
      * 用于在画布显示列表中渲染图像
      */
    let stage3 = new createjs.Stage('demo3')

    // 渲染图片
    let bitmap = new createjs.Bitmap('./assets/img/hill1.png')
    bitmap.alpha = 0.6      // 透明度
    bitmap.cursor = 'help'
    // 创建一个shadow实例Object(color, offsetX, offsetY, blur)
    bitmap.shadow = new createjs.Shadow("#97c89e", 20, 10, 20);

    // 给图片添加遮罩
    let bitmap2 = new createjs.Bitmap('./assets/img/avatar.jpg')
    bitmap2.x = 400;        // 图片绘制的起始点X坐标
    bitmap2.y = 0;          // 图片绘制的起始点Y坐标
    //遮罩图形
    let shape = new createjs.Shape();
    shape.graphics.beginFill('#000').drawCircle(0, 0, 100);
    shape.x = 500;          // 圆心X坐标
    shape.y = 100;          // 圆心Y坐标
    bitmap2.mask = shape;   //给图片bg添加遮罩

    // 绘制一片草地
    let groundBg = new createjs.Bitmap("./assets/img/ground.png").image;
    let ground = new createjs.Shape();
    w = stage3.canvas.width;      // 650
    h = stage3.canvas.height;     // 400
    stage3.addChild(ground)

    stage3.addChild(bitmap, bitmap2)
    stage3.update()       // 此处刷新无效

    // 监听定时广播
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick',(event) => {
      ground.tileW = groundBg.width;
      ground.y = h - groundBg.height;
      ground.graphics.beginBitmapFill(groundBg).drawRect(0, 0, w, groundBg.height);
      ground.cache(0, 0, w, groundBg.height);
        
      stage3.update()
    });
  }
</script>
```

### 一个小游戏(来自官网Demo) Running man
#### 定义一个`<canvas></canvas>`画布
```
<!-- HTML -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>running-man game</title>
</head>
<body>
  <canvas id="demoCanvas" width="960" height="400"></canvas>
  </body>
</html>
```
#### JS代码
这里就不写具体思路分析了，代码不长，注释也很详细，方便理解，直接上代码。

```
// JS
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script>
  window.onload = () => {
    let stage, w, h, loader;
    let sky, grant, ground, hill, hill2;

    function init() {
      stage = new createjs.StageGL("demoCanvas");

      // 获取画布的宽和高，后面计算使用
      w = stage.canvas.width;     // 960
      h = stage.canvas.height;    // 400

      // 定义静态资源
      let manifest = [{
        src: "spritesheet_grant.png", id: "grant"}, {     // 人物动作雪碧图
        src: "sky.png", id: "sky"}, {           // 天空
        src: "ground.png", id: "ground"}, {     // 地面
        src: "hill1.png", id: "hill"}, {        // 远山
        src: "hill2.png", id: "hill2"           // 近山
      }];     // Array, String, Object
      
      // 创建资源加载队列
      // (Boolean) 用XHR还是用HTML标签来加载
      // 如果是false的时候，就用标签来加载，如果不能用标签的话，就用XHR来加载。默认是true，用XHR来加载。
      loader = new createjs.LoadQueue(false);
      // 添加"资源加载完成"事件
      loader.addEventListener("complete", handleComplete);
      // 加载资源
      loader.loadManifest(manifest, true, "./assets/img/");  // (manifest, loadNow, basePath)
    }

    /**
      * 静态资源加载完成，处理函数
      */
    function handleComplete() {
      // 渲染天空
      sky = new createjs.Shape();
      sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);
      // 定义缓存区域(整个天空的区域))
      sky.cache(0, 0, w, h);

      // 渲染地面
      let groundImg = loader.getResult("ground");
      ground = new createjs.Shape();
      // 注意：drawRect()宽度要躲绘制一个单位
      ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
      ground.tileW = groundImg.width;
      ground.y = h - groundImg.height;
      // 缓存区域(地面的区域)
      ground.cache(0, 0, w + groundImg.width, groundImg.height);

      // 随机渲染远处山脉
      hill = new createjs.Bitmap(loader.getResult("hill"));
      // 设置图像转换
      // setTransform([x=0], [y=0], [scaleX=1], [scaleY=1], [rotation=0], [skewX=0], [skewY=0], [regX=0], [regY=0])
      hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
      hill.alpha = 0.5;     // 设置透明度

      // 随机渲染近处山脉
      hill2 = new createjs.Bitmap(loader.getResult("hill2"));
      hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);

      // 创建雪碧图动画
      let spriteSheet = new createjs.SpriteSheet({
        framerate: 30,      // 帧率 FPS
        "images": [loader.getResult("grant")],      // 雪碧图原图
        "frames": {"width": 165, "height": 292, "count": 64, "regX": 82, "regY": 0},  // 初始化
        // 定义动画
        "animations": {
          "run": [0, 25, "run"],     // name: [开始索引, 结束索引, '下一个动画名称', 倍率]
          "jump": [26, 63, "run"]
        }
      });

      // 绘制动画
      grant = new createjs.Sprite(spriteSheet, "run");
      // 处理雪碧图人物下方空白
      grant.y = 35;

      // 将生成的所有内容渲染至舞台
      stage.addChild(sky, ground, hill, hill2, grant);

      // 监听舞台上的鼠标点击事件
      stage.addEventListener("stagemousedown", () => {
        // 跳转播放 jump 动画
        grant.gotoAndPlay("jump");
      });

      createjs.Ticker.timingMode = createjs.Ticker.RAF;     // RAF / RAF_SYNCHED / TIMEOUT
      createjs.Ticker.addEventListener("tick", tick);
    }


    /**
      * 定时器-重绘舞台
      */
    function tick(event) {
      // event.delta -- 上一次tick到当前tick的ms
      let deltaS = event.delta / 1000;
      // 雪碧图人物移动距离
      let position = grant.x + 150 * deltaS;

      // getBounds() -- 返回当前帧相对于雪碧图原点的边界
      let grantW = grant.getBounds().width * grant.scaleX;
      grant.x = (position >= w + grantW) ? -grantW : position;

      ground.x = (ground.x - deltaS * 150) % ground.tileW;

      // 从右至左移动山脉
      hill.x = (hill.x - deltaS * 30);
      // 如果山脉从左侧离开屏幕
      if (hill.x + hill.image.width * hill.scaleX <= 0) {
        hill.x = w;     // 重置回屏幕最右侧
      }

      // 处理如上
      hill2.x = (hill2.x - deltaS * 45);
      if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
        hill2.x = w;
      }

      stage.update();
    }

    // 程序主入口-初始化
    init()
  }
</script>
```


<!-- 图片链接定义-->
[1]: ./assets/images/easeljs.jpg