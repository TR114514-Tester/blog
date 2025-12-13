# 前言
本教程主要的思路就是：Gmeek生成博客在`docs`目录里面，就设置`CloudFlare Pages`的根目录为`docs`，然后绑定域名即可
为什么部署到`CloudFlare Pages`？
**因为国内Github访问速度不太理想**
唯一加速的渠道我认为就是部署到`CloudFlare Pages`然后通过`CloudFlare CDN`进行'加速'
# 教程
首先我们来到`CloudFlare`的`Worker 和 Pages`
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/1.png)
点击右上角的`创建应用程序`
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/2.png)
点击下面的`Get started`
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/3.png)
点击`导入现有Git 存储库`右边的`开始使用`
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/4.png)
选择你的**Github账号**和你的**Gmeek仓库**
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/5.png)
划到下面，找到**构建输出目录**，在这里输入`docs`，然后点击**保存并部署**
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/6.png)
等待部署完毕
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/7.png)
点击**添加自定义域**
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/8.png)
绑定好你的域名就可以了
# 效果图
![img](https://blog.traveler.dpdns.org/Tutorial/CloudFlarePagesGmeek/9.png)
速度不能说很快，但是在国内比`Github Pages`友好多了