# 有啥用？
可以修改Gmeek页面的所有字体
# 使用
打开[https://blog-assets.traveler.dpdns.org/assets/GmeekFont.js](https://blog-assets.traveler.dpdns.org/assets/GmeekFont.js)
放到仓库的static目录下
修改开头的`FONT_URL`为ttf文件的url
然后在`config.json`中引入
```json
    "allHead":"<script src='https://yourname.github.io/GmeekFont.js'></script>",
```
`Ctrl + F5`刷新即可查看效果


你也可以复制下面的代码来使用
```javascript
// 定义TTF字体文件地址（请修改为您需要的地址）
const FONT_URL = 'https://blog-assets.traveler.dpdns.org/assets/font/font.ttf';
const FONT_FAMILY = 'Font';

// 加载并应用字体
const loadCustomFont = () => {
  // 创建字体定义
  const fontFace = new FontFace(
    FONT_FAMILY,
    `url(${FONT_URL}) format('truetype')`,
    { style: 'normal', weight: '400' }
  );
  
  // 加载字体
  fontFace.load()
    .then(loadedFont => {
      // 添加到文档字体集
      document.fonts.add(loadedFont);
      
      // 创建样式应用到所有元素
      const style = document.createElement('style');
      style.textContent = `
        * {
          font-family: '${FONT_FAMILY}', sans-serif !important;
        }
      `;
      
      // 添加到文档头部
      document.head.appendChild(style);
      
      console.log('自定义字体加载成功');
    })
    .catch(error => {
      console.error('字体加载失败:', error);
    });
};

// 页面加载完成后自动执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCustomFont);
} else {
  loadCustomFont();
}
```