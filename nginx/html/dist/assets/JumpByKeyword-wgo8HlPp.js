import{d as b,t as e,o as B,j as f,z as v,V as S,m as i,X as y}from"./index-u68fL4fj.js";const R=["innerHTML"],A=b({__name:"JumpByKeyword",setup(g){const n=e(""),a=e(`
1. Blob

Blob【Binary large object】即二进制大对象，表示原始文件的数据。它表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转成 ReadableStream 来用于数据操作。简单来说，Blob就是一个不可修改的二进制文件！

1.1 Blob 创建
sql复制代码new Blob(array, options);


array 是一个包含字符串、ArrayBuffer、ArrayBufferView、Blob 等的数组或可迭代对象。多个 BlobParts 会按照它们在数组中的顺序进行连接以形成 Blob。如果省略该参数，则创建一个空的 Blob。
options 是一个对象，可选属性为

type 【较常用】 ，默认值为""，表示放入到 blob 对象中内容的 MIME 类型



【补】： 常见的 MIME 类型如下：





























































MIME 类型描述text/plain纯文本文档text/htmlHTML 文档text/javascriptJavaScript 文件text/cssCSS 文件application/jsonJSON文件application/pdfPDF文件application/xmlXML 文件image/jpegJPEG图像image/pngPNG图像image/gifGIF 图像image/svg+xmlSVG 图像audio/mpegMP3 文件video/mpegMP4 文件
1.2 Blob 切片
Blob 对象内置了 slice() 方法用来将 blob 对象分片，其语法如下：
ini复制代码const blob = instanceOfBlob.slice([start [, end [, contentType]]]};

其有三个参数：

start：设置切片的起点，即切片开始位置。默认值为 0，这意味着切片应该从第一个字节开始；
end：设置切片的结束点，会对该位置之前的数据进行切片。默认值为blob.size；
contentType：设置新 blob 的 MIME 类型。如果省略 type，则默认为 blob 的原始值。

下面来看例子：
ini复制代码const iframe = document.getElementsByTagName("iframe")[0];

const blob = new Blob(["Hello World"], {type: "text/plain"});

const subBlob = blob.slice(0, 5);

iframe.src = URL.createObjectURL(subBlob);

此时页面会显示"Hello"。
2. File

File对象 其实就是特殊类型的 Blob，即 Blob 的属性和方法同样适用于 File 对象。

JS 中主要有两个地方产生 File 对象：

通过<input type='file'> 元素上传文件后，返回的 FileList 对象
文件拖放操作生成的 DataTransfer 对象

2.1 < input / >
ini复制代码<input type="file" id="fileInput" multiple="multiple">
const fileInput = document.getElementById("fileInput");
fileInput.onchange = (e) => {
  console.log(e.target.files); 
}

2.2 文件拖放
ini复制代码<div id="drop-zone"></div>

const dropZone = document.getElementById("drop-zone"); 
dropZone.ondragover = (e) => { 
   e.preventDefault();
} 
dropZone.ondrop = (e) => { 
  e.preventDefault(); 
  const files = e.dataTransfer.files; 
  console.log(files)
}

注意：


两个拖拽事件中都需要添加 e.preventDefault()，用来阻止默认事件，可以阻止浏览器的一些默认行为。比如默认浏览器不允许任何拖拽操作！！


e.dataTransfer.files 的属性值是一个 FileList 数组。


3. FileReader

FileReader 是一个异步 API，用于读取文件并提取其内容以供进一步使用。 【 FileReader 可以将 Blob 读取为不同的格式！！】

3.1 基本使用
3.1.1 创建对象：
ini复制代码const reader = new FileReader();

3.1.2 自身方法：


readAsArrayBuffer()：读取指定 Blob 中的内容，完成之后，result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象；


FileReader.readAsBinaryString()：读取指定 Blob 中的内容，完成之后，result 属性中将包含所读取文件的原始二进制数据；


FileReader.readAsDataURL()：读取指定 Blob 中的内容，完成之后，result 属性中将包含一个data: URL 格式的 Base64 字符串以表示所读取文件的内容。


FileReader.readAsText()：读取指定 Blob 中的内容，完成之后，result 属性中将包含一个字符串以表示所读取的文件内容。


可以看到，上面这些方法都接受一个要读取的 blob 对象作为参数，读取完之后会将读取的结果放入对象的 result 属性中。
3.1.3 事件处理：

abort：该事件在读取操作被中断时触发；
error：该事件在读取操作发生错误时触发；
load：该事件在读取操作完成时触发；
progress：该事件在读取 Blob 时触发。

当然，这些方法可以加上前置 on 后在HTML元素上使用，比如onload、onerror、onabort、onprogress。除此之外，由于 FileReader对象继承自EventTarget，因此还可以使用 addEventListener() 监听上述事件。
注意：
progress 事件提供了两个属性：loaded（已读取量）和total（需读取总量）。
4. ArrayBuffer

ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 的内容不能直接操作，只能通过 DataView 对象或 TypedArrray 对象来访问。这些对象用于读取和写入缓冲区内容。

注意： ArrayBuffer 本身就是一个黑盒，不能直接读写所存储的数据，需要借助以下视图对象来读写。


ArrayBuffer vs Blob: Blob 作为一个整体文件，适合用于传输 ；当需要对二进制数据进行操作时（比如要修改某一段数据时），就可以使用 ArrayBuffer。

具体操作方法详见 谈谈JS二进制
5. Object URL

Object URL 又称 Blog URL，它是一个用来表示File Object 或Blob Object 的URL。在网页中，我们可能会看到过这种形式的 Blob URL： 创建一个指向 Blob 或 File 对象的可以用作图像、二进制数据下载链接等的 URL 源，可以在 < img /> < script /> 中用当作 src 属性的值！！

arduino复制代码const objUrl = URL.createObjectURL(new File([""], "filename")); console.log(objUrl); URL.revokeObjectURL(objUrl);

6. Base64

Base64 是一种基于64个可打印字符来表示二进制数据的表示方法。Base64 编码普遍应用于需要通过被设计为处理文本数据的媒介< img />上储存和传输二进制数据而需要编码该二进制数据的场景。这样是为了保证数据的完整并且不用在传输过程中修改这些数据。

在 JavaScript 中，有两个函数被分别用来处理解码和编码 base64 字符串：

atob()：解码，解码一个 Base64 字符串；
btoa()：编码，从一个字符串或者二进制数据编码一个 Base64 字符串。

6.1 应用场景
6.1.1 toDataURL()方法把 canvas 画布内容生成 base64 编码格式的图片
javascript复制代码const canvas = document.getElementById('canvas'); const ctx = canvas.getContext("2d"); const dataUrl = canvas.toDataURL();

6.1.2 readAsDataURL()方法把读取的文件转为base64格式的data URL返回
7. 总结如下
  标签： 前端JavaScript  本文收录于以下专栏  
        1 / 2
         
          看面经总结
         
          专栏目录
           
        刷面试题小结
       7 订阅 · 79 篇文章   订阅  上一篇 
        JS（16）一文搞定异步函数 async、await
       下一篇 
        CSS 之 浏览器解析 CSS 选择器
       
          JavaScript
         
          专栏目录
           
        读“红宝石书”有感！！！
       3 订阅 · 17 篇文章   订阅  上一篇 
        JS（16）一文搞定异步函数 async、await
        评论 6           0 / 1000 
        标点符号、链接等不计算在有效字数内
       
        Ctrl + Enter
      
              发送
             登录 / 注册 即可发布评论！  
        最热
        
        最新
             
      是大刚啊
          
        
         头疼,头疼,这玩意看得头疼   
        15天前
       
        点赞
       
        评论
          
                  屏蔽作者：是大刚啊
                  举报        
      问渠那得清如许
          
        
         你这样直接搬别人的图真的好么   
        2月前
       
        1
       
        1
          
                  屏蔽作者：问渠那得清如许
                  举报        
      哈哈哈哈多好听
         
            作者
            : 不好意思哈，现在是小白，只是想把这里当作自己的笔记库用的‘   
        2月前
       
        点赞
       
        回复
          
                  屏蔽作者：哈哈哈哈多好听
                  举报        
      杜凡
          
        
         你好，我从微软的 文本转语音 获取了一个音频数据，我用腾讯云函数可以直接保存成 mp3 的音频文件到云存储，但我想把这个数据直接返回到前端在网页上直接播放，或者在前端保存成mp3文件，要怎么保存？   
        2月前
       
        点赞
       
        1
          
                  屏蔽作者：杜凡
                  举报        
      愿天知人意
           : 你这个data就是ArrayBuffer，直接用URL.createObjectURL转链接给audio就可以了   
        2月前
       
        点赞
       
        回复
          
                  屏蔽作者：愿天知人意
                  举报        
      圈圈又叉叉
          
        前端小白 @自学
            
        3月前
       
        点赞
       
        评论
          
                  屏蔽作者：圈圈又叉叉
                  举报       
                80
                
                6
                
            收藏
            加个关注，精彩更新不错过~   
                关注
                  
    哈哈哈哈多好听
       
        前端
         
        405
       文章 
        50k
       阅读 
        12
       粉丝 加个关注，精彩更新不错过~  
    关注
   
    已关注
     私信  目录 收起  
      1. Blob
     
      1.1 Blob 创建
     
      1.2 Blob 切片
     
      2. File
     
      2.1 < input / >
     
      2.2 文件拖放
     
      3. FileReader
     
      3.1 基本使用
     
      3.1.1 创建对象：
     
      3.1.2 自身方法：
     
      3.1.3 事件处理：
     
      4. ArrayBuffer
     
      5. Object URL
     
      6. Base64
     
      6.1 应用场景
     
      6.1.1 toDataURL()方法把 canvas 画布内容生成 base64 编码格式的图片
     
      6.1.2 readAsDataURL()方法把读取的文件转为base64格式的data URL返回
     
      7. 总结如下
       相关推荐 初探 Js 中的 Blob、ArrayBuffer、File 、FileRender、FormData  1.4k阅读  ·  8点赞FileReader 解析  234阅读  ·  0点赞10分钟带你了解什么是ArrayBuffer？  2.7k阅读  ·  33点赞JavaScript中 FileReader 对象详解  7.2k阅读  ·  6点赞前端二进制ArrayBuffer、TypedArray、DataView、Blob、File、Base64、FileReader一次性搞清楚  7.0k阅读  ·  144点赞 精选内容 前后端分离 Vue + NodeJS(Koa) + MongoDB，从产品到开发，全栈实践 
            KoK44541
            ·  42k阅读  ·  1.4k点赞创作者训练营 · 助力每一位创作新星，写出个人影响力！ 
            掘金酱
            ·  11k阅读  ·  62点赞vue3+gasp实现✨星之卡比输入框✨ 
            soon_liu
            ·  66阅读  ·  2点赞防抖和节流，你会手写吗？（下） 
            UrGend
            ·  108阅读  ·  13点赞2024 前六周数据出炉：进击的华为（含算法原题） 
            宫水三叶的刷题日记
            ·  15阅读  ·  1点赞 找对属于你的技术圈子 回复「进群」加入官方微信群    为你推荐     React -- (5) useState() 执行过程【批量更新and合并机制】 <1> transaction 事务【合成事件and生命周期函数】 因为事务的执行流程为： 在事务中会最先设置环境变量isBatchingUpdates为true 而执行 setState() 之前，   
                哈哈哈哈多好听
                
            10月前
              1.6k  
              7
              
              评论
               
            前端
          
            面试
          
            React.js
                  JS（16）一文搞定异步函数 async、await 异步函数 await 关键字【放在异步操作的前面】 1> await到底在等什么？ await 等待的是一个表达式【可以是 Promise 对象，也可以是任意其他值】 2> 遇到 await 关键字后   
                哈哈哈哈多好听
                
            4月前
              1.4k  
              1
              
              评论
               
            前端
          
            JavaScript
          
            面试
                  node.js [fs模块] 文件的读写 一. 写入文件 <1> 普通写入文件（异步 & 同步） (1) 异步写入：fs.writeFile() 接收四个参数： 参数1 ：必选 ，指定文件的路径【不存在该文件的话，会按照所给路径新建一个文件！   
                哈哈哈哈多好听
                
            9月前
              1.3k  
              点赞
              
              评论
               
            Node.js
          
            前端
                  JS -- (5) 执行上下文及其属性（作用域链、活动对象） <1> JS的可执行代码类型： 全局代码 函数代码 eval代码 <2> 执行上下文栈 && 全局上下文 && 函数上下文 每个函数都有自己的函数上下文，那那么多函数就对应有很多的函数上下文，那我们是   
                哈哈哈哈多好听
                
            10月前
              883  
              2
              
              评论
               
            前端
          
            面试
          
            JavaScript
                  React——03类式组件的三大核心属性之一：state 《一. state简介》 state是类式组件实例对象里的一个属性，它的值是一个对象，因为一个组件可能会有很多部分涉及到状态，要存的东西很多。 《二 . 用途》 （1）页面的元素不是一成不变的，需要改   
                哈哈哈哈多好听
                
            1年前
              595  
              3
              
              评论
               
            React.js
                  SassScript 06 混合指令 1 . 定义混合指令 ： @mixin 用法 ： 在 @mixin 后添加名称与样式 ，如下： 2 . 引用混合样式 ： @include 用法 ： 在 @include 后加上定义的混合指令即可引用   
                哈哈哈哈多好听
                
            1年前
              551  
              1
              
              评论
               
            SCSS
                  CSS(23) -- (不)完全脱离文档流之(浮动float)absolute 一. float <1> float 的特性 被设置了浮动的元素会脱离文档流（但也不是完全脱离，下面也会讲）但是float元素并不是完全脱离文档流，即后面的元素不是可以完全升上去被它压在下面！！！ 会   
                哈哈哈哈多好听
                
            10月前
              331  
              2
              
              评论
               
            前端
          
            CSS
          
            面试
                  JS（14）一文搞定 this 指向【含有.apply、.call、.bind()】 一. this 的五种绑定形式 <1> 默认绑定 注意： 在严格模式下，默认的 this 绑定指向 undefined 但如果是在非严格模式下调用不在严格模式下的函数，并不会影响 this 指向！！！   
                哈哈哈哈多好听
                
            4月前
              215  
              1
              
              评论
               
            前端
          
            JavaScript
          
            面试
                  JS -- (11) 继承 大致有6种继承，各有利弊吧 原型链继承 盗用构造函数 组合继承 【原型链 + 盗用构造函数】 原型式继承 【适用于不需要单独创建构造函数，但仍需在对象之间共享信息的场合】 寄生式继承 【寄生构造函数+   
                哈哈哈哈多好听
                
            10月前
              166  
              3
              
              评论
               
            前端
          
            JavaScript
          
            面试
                  一问搞懂 HTTPS 加密 and 抓包原理 HTTPS 的加密过程可以分为以下步骤： 客户端向服务器发送 HTTPS 请求。 服务器将公钥证书发送给客户端。 客户端验证服务器的证书。 如果验证通过，客户端生成一个用于会话的对称密钥。 客户端使   
                哈哈哈哈多好听
                
            2月前
              202  
              点赞
              
              评论
               
            前端
          
            浏览器
                  React -- (6) Redux中间件与函数柯里化 一. Redux 中间件 二. 函数柯里化 先来看一下函数柯里化，毕竟函数柯里化是实现 Redux 中间件的基础！！！ 栗子1： 比如我们要实现一个求和函数 sum(x,y,z,q) ，它接收四个参数   
                哈哈哈哈多好听
                
            10月前
              192  
              1
              
              评论
               
            前端
          
            面试
          
            Redux
                  CSS 性能优化  1. 首次有效绘制【内联首屏关键 CSS】 大家一般都习惯于通过 < link /> 标签来引用外部的 CSS 文件。 好，那怎么能确定哪些样式是首屏渲染需要的呢？除了手动识别，github上有一个项   
                哈哈哈哈多好听
                
            2月前
              183  
              点赞
              
              评论
               
            CSS
          
            前端
                  JS -- (4) 原始值包装类型 && 隐式类型转换规则 一. 原始值包装类型 创建对应原始值包装类型的对象 调用相关方法 or 属性（length） 立马销毁对象 装箱 && 拆箱： 装箱 JS 也可以通过 Object() 函数显式地把基本类型转换为包装   
                哈哈哈哈多好听
                
            10月前
              163  
              1
              
              评论
               
            前端
          
            JavaScript
          
            面试
                  谈谈JS二进制：File、Blob、FileReader、ArrayBuffer、Base64 JavaScript 提供了一些 API 来处理文件或原始文件数据，例如：File、Blob、FileReader、ArrayBuffer、base64 等。下面就来看看它们都是如何使用的，它们之间又   
                CUGGZ
                
            1年前
              9.7k  
              409
              
              19
               
            前端
          
            JavaScript
                  前端二进制ArrayBuffer、TypedArray、DataView、Blob、File、Base64、FileReader一次性搞清楚 ArrayBuffer、TypedArray、DataView、Blob、File、Base64、FileReader一次性搞清楚。   
                苏苏同学
                
            2年前
              7.0k  
              144
              
              14
               
            JavaScript
          
            面试
          
            前端
                加个关注，精彩更新不错过~  关注 收藏成功！ 已添加到「」， 点击更改微信微信扫码分享新浪微博QQ   
  APP内打开
  

Please login on OpenAI.Login on OpenAI确定屏蔽该用户 
        屏蔽后，对方将不能关注你、与你产生任何互动，无法查看你的主页
       取消 
        确定
       选择你感兴趣的技术方向  
              后端
             
              前端
             
              Android
             
              iOS
             
              人工智能
             
              开发工具
             
              代码人生
             
              阅读
             跳过 上一步 
      至少选择1个分类
      温馨提示 当前操作失败，如有疑问，可点击申诉 前往申诉 我知道了
        沉浸阅读
      

作者：哈哈哈哈多好听
链接：https://juejin.cn/post/7306802651009138688
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
`),r=e(),c=e();function d(){const t=new RegExp(n.value,"gi"),o=/<span class="highlight">([^<]+)<\/span>/g;a.value=a.value.replace(o,"$1"),a.value=a.value.replace(t,s=>`<span class="highlight">${s}</span>`)}const u=e(0),l=e(0);function p(){var t;r.value=((t=c.value)==null?void 0:t.querySelectorAll(".highlight"))??[],u.value=r.value.length,l.value<u.value?r.value[l.value++].scrollIntoView({behavior:"smooth"}):(l.value=0,r.value[l.value].scrollIntoView({behavior:"smooth"}))}return(t,o)=>(B(),f("div",null,[v(i("input",{"onUpdate:modelValue":o[0]||(o[0]=s=>n.value=s),placeholder:"Enter search keyword",onKeydown:y(d,["enter"])},null,544),[[S,n.value]]),i("button",{onClick:d},"Search"),i("button",{onClick:p},"next"),i("div",{ref_key:"content",ref:c,style:{height:"300px","overflow-y":"scroll"},innerHTML:a.value},null,8,R)]))}});export{A as default};
