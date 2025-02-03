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
### 修改配置
```
<title>网页标题</title>
<meta name="description" content="网站描述">
<meta name="keywords" content="网站搜索标签"> //用英文逗号隔开
<link rel="icon" type="image/ico" href="logo"> //链接或路径
```
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
### 修改配置
```
<img class="profile-photo" src="图像地址" alt="图像描述"> //src= 图像链接或链接 alt= 图像的描述
<h1 class="profile-name">名称</h1>
<p class="profile-title" id="hitokoto"></p> //id="hitokoto"为一言获取
<p class="profile-bio" id="from"></p> //id="from" 为该一言的来源
```
其中的 id="hitokoto" 和 id="from" 删除后看可换为自己的简介或格言<br />

#### 效果图
![矩形 1](https://github.com/user-attachments/assets/e7c00a59-387b-4bd9-a950-2402717bba57)    ![矩形 2](https://github.com/user-attachments/assets/c9f72b26-154b-4621-9e83-2f58253f4e24)

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
### 修改配置
```
name: '网易云音乐', //音乐平台
defaultPlaylist: '13230215625' //该平台的歌单id

name: 'QQ音乐', //音乐平台
defaultPlaylist: '8982152830' //该平台的歌单id
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

7. 复制下来到index.html中替换defaultPlaylist:即可QQ音乐同理

### 按钮修改
在index.html中的<body>找到以下代码，在第143-167行
```
  <a href="https://blog.ioioi.lol/" class="social-btn">
    <i class="ri-blogger-line"></i>
    <span>biaoti</span>
  </a>
```
### 修改配置
```
<a href="链接" class="social-btn"> // 要打开的链接
<i class="ri-blogger-line"></i> //icon图标 图标库为 `https://remixicon.com/`
<span>标题</span>
```
### icon图标获取

- 浏览器访问`https://remixicon.com/` 然后找到一个相关的或者你喜欢的图标

![408887763-b17bb5a3-bfd0-4c2b-8bac-2c6c9acf12f9](https://github.com/user-attachments/assets/a63a9ea2-205a-40e6-80f3-cce3a9b43f78)

- 点击该图标复制代码替换 `<i class="ri-blogger-line"></i>`
   
![408887804-b5a99d45-1c82-4e41-822b-ba0f3005fdeb](https://github.com/user-attachments/assets/922d96ae-b32e-43b5-bdec-09f444d9ced6)

- 替换index.html中的`<i class="ri-blogger-line"></i>`即可

## 依赖项目
[https://github.com/metowolf/MetingJS](https://github.com/injahow/meting-api)

## 协议说明  
   -  **允许**: 免费使用、修改、分发（包括商业场景）  
   - **禁止**: 直接售卖软件或用于付费服务  
   -  完整协议：[LICENSE](LICENSE.md)
