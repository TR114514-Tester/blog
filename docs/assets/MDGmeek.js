// 添加高斯模糊程度变量（可调整）
const BLUR_INTENSITY = '8px'; // 高斯模糊程度，可修改这个值
const BUTTON_HOVER_COLOR = '#8A2BE2'; // 右上角按钮悬浮颜色，可修改这个值（支持 #000000, rgb(255,0,0), rgba(255,0,0,0.8) 等格式）
const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
document.addEventListener('DOMContentLoaded', function() {

    
    // 导入MDUI样式（如果尚未导入）
    const mduiCSS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/css/mdui.min.css';
    const mduiJS = 'https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/js/mdui.min.js';
    
    // 检查是否已加载MDUI CSS
    if (!document.querySelector(`link[href="${mduiCSS}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = mduiCSS;
        document.head.appendChild(link);
    }
    
    // 检查是否已加载MDUI JS
    if (!document.querySelector(`script[src="${mduiJS}"]`)) {
        const script = document.createElement('script');
        script.src = mduiJS;
        document.head.appendChild(script);
    }
    
    // 创建MDUI卡片容器并包装body内容
    const bodyContent = document.body.innerHTML;
    const cardContainer = document.createElement('div');
    cardContainer.className = 'mdui-card mdui-card-content';
    cardContainer.style.cssText = `
        backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        -webkit-backdrop-filter: blur(${BLUR_INTENSITY}) !important;
        background: rgba(255, 255, 255, 0.15) !important;
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(cardContainer);
    cardContainer.innerHTML = bodyContent;
    
    // 美化 SideNav item 为 MDUI 卡片
    function beautifySideNavItems() {
        const sideNavItems = document.querySelectorAll('.SideNav-item');
        
        sideNavItems.forEach(item => {
            // 创建卡片包装器
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'mdui-card mdui-hoverable mdui-ripple side-nav-card';
            cardWrapper.style.cssText = `
                margin-bottom: 10px;
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            `;
            
            // 创建卡片内容
            const cardContent = document.createElement('div');
            cardContent.className = 'mdui-card-primary';
            cardContent.style.cssText = `
                padding: 16px;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.75) 100%);
            `;
            
            // 获取原始链接内容
            const link = item.querySelector('a');
            if (link) {
                // 复制链接内容到卡片
                const linkClone = link.cloneNode(true);
                linkClone.style.cssText = `
                    display: block;
                    color: #333;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 16px;
                    transition: color 0.3s ease;
                `;
                
                // 添加图标（可以根据需要自定义）
                const icon = document.createElement('i');
                icon.className = 'mdui-icon material-icons';
                icon.style.cssText = `
                    float: right;
                    color: #8A2BE2;
                    opacity: 0.7;
                    font-size: 20px;
                `;
                icon.textContent = 'chevron_right'; // MDUI 图标
                
                linkClone.appendChild(icon);
                cardContent.appendChild(linkClone);
            } else {
                // 如果没有链接，直接复制内容
                cardContent.innerHTML = item.innerHTML;
            }
            
            // 组装卡片
            cardWrapper.appendChild(cardContent);
            
            // 替换原始 item
            item.parentNode.replaceChild(cardWrapper, item);
        });
    }
    
    // 添加 SideNav 卡片样式
    const sideNavStyle = document.createElement('style');
    sideNavStyle.innerHTML = `
        .side-nav-card {
            border: 1px solid rgba(255, 255, 255, 0.5) !important;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }
        
        .side-nav-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(138, 43, 226, 0.2) !important;
            border-color: rgba(138, 43, 226, 0.3) !important;
        }
        
        .side-nav-card .mdui-card-primary a:hover {
            color: ${BUTTON_HOVER_COLOR} !important;
        }
        
        .side-nav-card .mdui-card-primary a:hover .mdui-icon {
            opacity: 1;
            transform: translateX(2px);
        }
        
        .side-nav-card .mdui-icon {
            transition: all 0.3s ease;
        }
        
        /* 侧边导航容器样式 */
        .SideNav {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 10px 0;
        }
    `;
    document.head.appendChild(sideNavStyle);
    
    //判断url，添加主题------------------------------------------------------------------------
    let currentUrl = window.location.pathname;

    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        console.log('MDGmeek : 应用主页主题');

        //主页主题------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
        }
        
        #header h1 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .title-right {
            margin: unset;
            margin-top: 295px;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        
        .avatar {
            width: 200px;
            height: 200px;
        }
        
        #header h1 a {
            margin-top: 30px;
            font-family: fantasy;
            margin-left: unset;
        }
        
        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }
        
        body {
            margin: 30px auto;
            padding: 0;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
        }
        
        /* MDUI卡片样式 */
        .mdui-card {
            margin: 0 auto;
            padding: 20px;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        /* 增强 SideNav 卡片效果 */
        .SideNav {
            background: transparent !important;
            border-radius: 10px;
            min-width: unset;
            padding: 15px 0;
        }
        
        .side-nav-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%) !important;
            margin-bottom: 12px !important;
        }
        
        .side-nav-card:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%) !important;
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 8px 25px rgba(138, 43, 226, 0.25) !important;
        }
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, .pagination span:hover, .pagination span:focus, .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        `;
        document.head.appendChild(style);
        
        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        
        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });

    } else if (currentUrl.includes('/post/') || currentUrl.includes('/link.html') || currentUrl.includes('/about.html')) {
        console.log('MDGmeek : 应用文章页主题');

        //文章页主题------------------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `

        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }

        body {
            min-width: 200px;
            max-width: 1100px;
            margin: 30px auto;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
            padding: 0 !important;
        }

        /* MDUI卡片样式 */
        .mdui-card {
            width: 100%;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }

        @media (min-width: 1001px) {
        .mdui-card {
            padding: 45px;
        }
        }

        @media (max-width: 1000px) {
        .mdui-card {
            padding: 20px;
        }
        }

        /* markdown内容 */
        .markdown-body img {
            border-radius: 10px;
            border: 2px solid #a3e0e4;
        }

        .markdown-alert {
            border-radius: 10px;
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.85);
            border-radius: 10px;
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgba(141, 150, 161, 0.2);
        }

        video {
            border-radius: 10px;
        }

        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }

        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
        }

        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }

        div.title-right .btn:hover .btndescription {
            display: inline;
        }

        `;
        document.head.appendChild(style);

        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");

        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });

    } else if (currentUrl.includes('/tag.html')) {
        console.log('MDGmeek : 应用搜索页主题');

        // 搜索页主题--------------------------------------------------------------------
        let style = document.createElement("style");
        style.innerHTML = `
        
        /* header布局*/
        
        .title-right {
            align-items: flex-end;
        }

        @media (max-width: 600px) {
            .tagTitle {
                display: unset;
                font-size: 14px;
                white-space: unset;
            }
        }
        
        /* 背景图片 */
        html {
            background: url('${BACKGROUND}') no-repeat center center fixed;
            background-size: cover;
            height: 100%;
        }
        
        body {
            margin: 30px auto;
            padding: 0;
            font-size: 16px;
            font-family: sans-serif;
            line-height: 1.25;
            background: transparent !important;
            border-radius: 0;
            box-shadow: none;
            overflow: auto;
        }
        
        /* MDUI卡片样式 */
        .mdui-card {
            margin: 0 auto;
            padding: 20px;
            border-radius: 16px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        
        /* 增强 SideNav 卡片效果 */
        .SideNav {
            background: transparent !important;
            border-radius: 10px;
            min-width: unset;
            padding: 15px 0;
        }
        
        .side-nav-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%) !important;
            margin-bottom: 12px !important;
        }
        
        .side-nav-card:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%) !important;
            transform: translateY(-3px) scale(1.02) !important;
            box-shadow: 0 8px 25px rgba(138, 43, 226, 0.25) !important;
        }
        
        /* 右上角按钮 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: ${BUTTON_HOVER_COLOR.startsWith('#') ? BUTTON_HOVER_COLOR + 'cc' : BUTTON_HOVER_COLOR} !important;
        }
        
        div.title-right .btn .btndescription {
            display: none;
            margin-left: 3px;
            white-space: nowrap;
            color: black;
            font-weight: bold;
        }
        
        div.title-right .btn:hover .btndescription {
            display: inline;
        }
        
        .subnav-search-input {
            border-radius: 2em;
            float: unset !important;
        }
        
        .subnav-search-icon {
            top: 9px;
        }
        
        button.btn.float-left {
            display: none;
        }
        
        .subnav-search {
            width: unset; 
            height: 36px;
        }
        `;
        document.head.appendChild(style);
        
        //右上角按钮描述
        let topright_buttons = document.querySelectorAll(".title-right a.btn");
        
        topright_buttons.forEach(button => {
            var title = button.getAttribute('title');
            if (title) {
                var btndescription = document.createElement('span');
                btndescription.className = 'btndescription';
                btndescription.textContent = title;
                button.appendChild(btndescription);
            }
        });
        
        let input = document.getElementsByClassName("form-control subnav-search-input float-left")[0];
        let button = document.getElementsByClassName("btn float-left")[0];
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                button.click();
            }
        });

    } else {
        console.log('MDGmeek : 未应用主题');
    }
    
    // 为 notranslate 类添加 MDUI Roboto 字体
    const notranslateStyle = document.createElement("style");
    notranslateStyle.innerHTML = `
        /* 为所有 notranslate 类应用 MDUI Roboto 字体 */
        .notranslate {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            font-weight: 400;
            line-height: 1.5;
            letter-spacing: 0.00938em;
        }
        
        /* 为 notranslate 内的特定元素设置字体 */
        .notranslate h1,
        .notranslate h2,
        .notranslate h3,
        .notranslate h4,
        .notranslate h5,
        .notranslate h6 {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            font-weight: 500;
        }
        
        .notranslate code,
        .notranslate pre {
            font-family: 'Roboto Mono', 'Consolas', 'Monaco', 'Courier New', monospace !important;
        }
        
        .notranslate blockquote {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
            font-style: italic;
            font-weight: 300;
        }
        
        /* 确保按钮也使用 Roboto 字体 */
        .notranslate button,
        .notranslate input,
        .notranslate select,
        .notranslate textarea {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        /* 表格中的文字也应用 Roboto 字体 */
        .notranslate table,
        .notranslate th,
        .notranslate td {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        /* 列表项也应用 Roboto 字体 */
        .notranslate ul,
        .notranslate ol,
        .notranslate li {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
        }
        
        /* 链接也应用 Roboto 字体 */
        .notranslate a {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif !important;
        }
    `;
    document.head.appendChild(notranslateStyle);
    
    // 添加默认卡片样式（适用于所有页面）
    const defaultCardStyle = document.createElement("style");
    defaultCardStyle.innerHTML = `
        .mdui-card {
            transition: all 0.3s ease;
            min-height: 200px;
        }
        
        .mdui-card:hover {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2) !important;
        }
        
        /* 等待页面加载完成后执行 SideNav 美化 */
        window.addEventListener('load', function() {
            setTimeout(beautifySideNavItems, 100);
        });
    `;
    document.head.appendChild(defaultCardStyle);
    
    // 导入 Roboto 字体（如果尚未导入）
    const loadRobotoFont = () => {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono&display=swap';
        fontLink.rel = 'stylesheet';
        fontLink.type = 'text/css';
        
        // 检查是否已加载 Roboto 字体
        const existingFonts = document.querySelectorAll('link[href*="fonts.googleapis.com/css2?family=Roboto"]');
        if (existingFonts.length === 0) {
            document.head.appendChild(fontLink);
            console.log('MDGmeek: Roboto 字体已加载');
        }
    };
    
    // 延迟加载字体，避免阻塞页面渲染
    setTimeout(loadRobotoFont, 500);
});
