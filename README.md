# ElegPage
#### 一款现代化极简风格的个人主页引导模板

## 效果图
![蒙版分组](https://github.com/user-attachments/assets/9703a6ef-d77c-48f0-89db-a6c3dbedfcd3)

## Dome
### 点击跳转 [演示](https://ioioi.lol/)

## 保姆级使用文档
### SEO网站标题和logo更换
在index.html中找到以下代码，在第7-10行
```
<title>Acornia的主页</title>
<meta name="description" content="Acornia的个人引导页面,您可以从这里访问到我的所有公开服务">
<meta name="keywords" content="Acornia,个人主页,程序员,个人引导页">
<link rel="icon" type="image/ico" href="assets/images/favicon.ico">
```
### 标签介绍
1. `title`标签定义文档的标题。标题必须是纯文本的，显示在浏览器的标题栏或页面的选项卡中<br />
    只需要替换其中的 Acornia的主页 修改自己的即可
2. `meta`标签定义关于 HTML 文档的元数据,元数据是关于数据的数据（信息）<br />
   `meta`标签始终位于 head 元素 内，通常用于指定字符集、页面描述、关键词、文档作者和视口设置：<br />
    meta name="description" content="Acornia的个人引导页面,您可以从这里访问到我的所有公开服务" <br />
    只需要替换其中的`Acornia的个人引导页面,您可以从这里访问到我的所有公开服务`即可
3.  meta name="keywords" content="Acornia,个人主页,程序员,个人引导页"为网站关键词<br />
   只需要替换其中的`Acornia,个人主页,程序员,个人引导页`即可请用英文逗号隔开，不设置则不输出该 Meta 标签
5. `link`为标签定义当前文档与外部资源之间的关系 常用于链接到外部样式表或向网站添加图标,网站图标是您在浏览器标签页,通常为正方形，像素至少为 512 x 512<br />
#### 效果图
![screenshot-1738504576207](https://github.com/user-attachments/assets/90d70644-6800-4207-a620-dd197961d217)

### 头像/名称更换
在index.html中找到以下代码，替换其中的文本或图片链接即可，在28-35行
```
<div class="avatar-container">
  <img class="profile-photo" src="assets/images/avatar.jpg" alt="头像">
</div>
  <h1 class="profile-name">Acornia</h1>
   <p class="profile-title" id="hitokoto"></p>
  <p class="profile-bio" id="from"></p>
```
其中的id="hitokoto"和id="from"分别为一言API的id删除后看跟换为自己的简介或格言<br />
id="hitokoto"为一言获取<br />
id="from" 为该一言的来源<br />
#### 效果图
![screenshot-1738509643679](https://github.com/user-attachments/assets/3a6749eb-94d8-4385-b41a-c41e9d214b5b)

![screenshot-1738524717308](https://github.com/user-attachments/assets/67caa9ad-87e6-4cac-8f03-207b479151d7)


### 音乐播放器API设置

在index.html中找到以下代码，在17-20行替换即可
```
const METING_APIS = [
    '/meting/',
    'https://ioioi.lol/meting/'
];
```
#### 该配置可无需修改
默认使用即可已内置api如不想使用内置的也可以使用第三方<br />
支持多个api节点添加只需要使用''加链接即可一行一个<br />
！！！注意是英文的，如果是添加在最后面检查一下前面,最后面的不需要添加如果是添加前面则需要英文逗号，


### 音乐播放器歌单设置

在index.html中找到以下代码，在24-33行替换即可
```
const PLATFORM_CONFIG = {
    netease: {
        name: '网易云音乐',
        defaultPlaylist: '13230215625'
    },
    tencent: {
        name: 'QQ音乐',
        defaultPlaylist: '8982152830'
    }
};
```
只修改defaultPlaylist：中的数字即可列如：defaultPlaylist: '13230215625' 修改为defaultPlaylist: '1234567890'
在修改前请注意歌单平台

### 歌单获取 

网易云为例
1. 在浏览器中搜索网易云音乐点击进入
2. 在网易云首页找到歌单
   
![408887587-99e84042-3625-4c2f-b7e6-475b23f45a91](https://github.com/user-attachments/assets/340b1386-d983-4a0e-be6a-af37d1bb481e)

4. 找到一个你喜欢的或者是自己创建的点击进去
   
![screenshot-1738519374607](https://github.com/user-attachments/assets/7eea08a2-bc92-4c1a-9484-349d2eead8db)

6. 在浏览器的搜索框中找到其中的数字 12937122744
   
![屏幕截图 2025-02-02 221705](https://github.com/user-attachments/assets/29984116-bdaa-483a-b2fc-b90bbbdff739)

7. 复制下来到assets\js\script.js中替换defaultPlaylist:即可QQ音乐同理

### 按钮修改
在index.html中的<body>找到以下代码，在第143-167行
```
  <a href="https://blog.ioioi.lol/" class="social-btn">
    <i class="ri-blogger-line"></i>
    <span>Blog</span>
  </a>
```
其中的`a`标签定义超链接，用于从一张页面链接到另一张页面<br />
`a`元素最重要的属性是 href 属性，它指示链接的目的地<br />
例如我要修改为百度 链接为`https://www.baidu.com/`我们只需要将修改 <br />
`a href="https://blog.ioioi.lol/" class="social-btn"`修改为 <br />
`a href="https://www.baidu.com/" class="social-btn"`即可<br />
`i` 标签定义了以不同的语气或情态表达的文本部分。通常内部内容会以斜体显示<br />
在这里只是作为icon图标使用，图标库为https://remixicon.com/<br />
1. 图标替换浏览器访问`https://remixicon.com/`找到自己喜欢的或者是相关的

![408887763-b17bb5a3-bfd0-4c2b-8bac-2c6c9acf12f9](https://github.com/user-attachments/assets/a63a9ea2-205a-40e6-80f3-cce3a9b43f78)

2. 点击该图标复制代码替换 `<i class="ri-blogger-line"></i>`
   
![408887804-b5a99d45-1c82-4e41-822b-ba0f3005fdeb](https://github.com/user-attachments/assets/922d96ae-b32e-43b5-bdec-09f444d9ced6)

`span`标签是HTML中的一个内联元素，用于定义文档中的一个短片段，在这里span只是作为按钮名称<br />
替换也是一样的`blog`替换成 博客，b站任意文本，经量文本控制在7个已内

## 依赖项目
[https://github.com/metowolf/MetingJS](https://github.com/injahow/meting-api)
