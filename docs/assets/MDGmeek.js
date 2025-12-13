document.addEventListener('DOMContentLoaded', function() {
    const BACKGROUND = "http://blog.traveler.dpdns.org/assets/image/background.png";
    
    // ==================== 1. 自动导入 MDUI 2 CSS 和 JS ====================
    function loadMDUIResources() {
        if (!document.querySelector('link[href*="mdui.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/mdui@2/mdui.css';
            document.head.appendChild(link);
        }
        if (!document.querySelector('script[src*="mdui.global.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/mdui@2/mdui.global.js';
            document.body.appendChild(script);
        }
    }
    loadMDUIResources();
    // ====================================================================

    let currentUrl = window.location.pathname;

    // ==================== 2. 包装页面内容到MDUI卡片 + 高斯模糊 ====================
    function wrapContentInMduiCard() {
        const body = document.body;
        const originalContent = body.innerHTML;
        
        // 创建外层容器 - 用于背景模糊
        const container = document.createElement('div');
        container.className = 'mdui-container';
        container.style.padding = '16px';
        container.style.maxWidth = '1100px';
        container.style.margin = '30px auto';
        
        // 创建MDUI卡片
        const card = document.createElement('mdui-card');
        card.setAttribute('variant', 'elevated');
        card.style.borderRadius = '10px';
        card.style.overflow = 'hidden';
        card.style.position = 'relative'; // 为伪元素定位做准备
        
        // 创建高斯模糊背景层
        const blurBackground = document.createElement('div');
        blurBackground.className = 'blur-background-layer';
        blurBackground.style.position = 'absolute';
        blurBackground.style.top = '0';
        blurBackground.style.left = '0';
        blurBackground.style.width = '100%';
        blurBackground.style.height = '100%';
        blurBackground.style.zIndex = '-1'; // 置于内容下方
        
        // 将原始内容放入卡片
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'card-content-wrapper';
        contentWrapper.style.position = 'relative'; // 确保内容在模糊层之上
        contentWrapper.style.zIndex = '1';
        contentWrapper.innerHTML = originalContent;
        
        // 组装卡片结构
        card.appendChild(blurBackground);
        card.appendChild(contentWrapper);
        
        // 将卡片放入容器
        container.appendChild(card);
        body.innerHTML = '';
        body.appendChild(container);
        
        // 添加全局样式（包括高斯模糊效果）
        const htmlStyle = document.createElement('style');
        htmlStyle.innerHTML = `
            html {
                background: url('${BACKGROUND}') no-repeat center center fixed !important;
                background-size: cover !important;
                min-height: 100vh;
            }
            body {
                background: transparent !important;
                margin: 0;
                padding: 0;
            }
            
            /* 高斯模糊关键样式 */
            .blur-background-layer {
                background: inherit; /* 继承父元素背景 */
                overflow: hidden;
            }
            
            .blur-background-layer::before {
                content: '';
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                background: inherit;
                background-attachment: fixed;
                filter: blur(10px); /* 高斯模糊强度 */
                -webkit-filter: blur(10px); /* Safari 支持 */
                margin: -10px; /* 扩大模糊区域避免边缘白边 */
            }
            
            /* 卡片内容区域样式 */
            .card-content-wrapper {
                background: rgba(255, 255, 255, 0.85); /* 白色半透明遮罩，让文字更清晰 */
                backdrop-filter: blur(5px); /* 额外的模糊效果增强 */
                -webkit-backdrop-filter: blur(5px); /* Safari 支持 */
                min-height: 100%;
                box-sizing: border-box;
            }
            
            /* 移除原内容中的body背景色 */
            #mdui-card-container, 
            .mdui-card {
                background: transparent !important;
            }
        `;
        document.head.appendChild(htmlStyle);
    }
    
    wrapContentInMduiCard();
    // ====================================================================

    // ==================== 3. 各页面主题调整（适配高斯模糊背景） ====================
    if (currentUrl.includes('/index.html') || currentUrl === "/") {
        console.log('MDGmeek : 应用主页主题 (带高斯模糊的MDUI卡片)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 主页主题 - 适配高斯模糊背景 */
        
        /* 调整内容区域透明度 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important; /* 主页稍低透明度 */
        }
        
        /* header布局调整 */
        .blogTitle {
            display: unset;
        }
        
        #header {
            height: 340px;
            background: transparent !important;
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
        
        /* 侧边导航适配 */
        .SideNav {
            background: rgba(255, 255, 255, 0.75) !important; /* 降低透明度适应模糊背景 */
            border-radius: 10px;
            min-width: unset;
            backdrop-filter: blur(3px); /* 侧边导航也添加轻微模糊 */
            -webkit-backdrop-filter: blur(3px);
        }
        
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.8) !important; /* 半透明悬停效果 */
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        
        .SideNav-item {
            transition: 0.5s;
        }
        
        /* 分页条 */
        .pagination a:hover, .pagination a:focus, 
        .pagination span:hover, .pagination span:focus, 
        .pagination em:hover, .pagination em:focus {
            border-color: rebeccapurple;
        }
        
        /* 右上角按钮 - 适配模糊背景 */
        div.title-right .btn {
            display: inline-flex;
            align-items: center;
            width: auto;
            height: 40px;
            margin: 0 3px;
            border-radius: 2em !important;
            transition: 0.3s;
            background: rgba(255, 255, 255, 0.9) !important; /* 按钮背景半透明 */
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: rgba(60, 210, 205, 0.9) !important; /* 半透明悬停颜色 */
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
        
        // 右上角按钮描述
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
        console.log('MDGmeek : 应用文章页主题 (带高斯模糊的MDUI卡片)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 文章页主题 - 适配高斯模糊背景 */
        
        /* 调整内容区域透明度 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.88) !important; /* 文章页较高透明度 */
        }
        
        /* markdown内容 */
        .markdown-body img {
            border-radius: 10px;
            border: 2px solid #a3e0e4;
            background: rgba(255, 255, 255, 0.7); /* 图片添加半透明背景 */
        }

        .markdown-alert {
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.85) !important; /* 警告框半透明 */
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }

        .markdown-body .highlight pre, .markdown-body pre {
            background: rgba(255, 255, 255, 0.9) !important; /* 代码块更高透明度 */
            border-radius: 10px;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
        }

        .markdown-body code, .markdown-body tt {
            background-color: rgba(141, 150, 161, 0.25) !important; /* 行内代码半透明 */
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
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }

        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: rgba(60, 210, 205, 0.9) !important;
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

        // 右上角按钮描述
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
        console.log('MDGmeek : 应用搜索页主题 (带高斯模糊的MDUI卡片)');
        let style = document.createElement("style");
        style.innerHTML = `
        /* 搜索页主题 - 适配高斯模糊背景 */
        
        /* 调整内容区域透明度 */
        .card-content-wrapper {
            background: rgba(255, 255, 255, 0.82) !important;
        }
        
        /* header布局 */
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
        
        /* 侧边导航 */
        .SideNav {
            background: rgba(255, 255, 255, 0.75) !important;
            border-radius: 10px;
            min-width: unset;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        .SideNav-item:hover {
            background-color: rgba(195, 228, 227, 0.8) !important;
            border-radius: 10px;
            transform: scale(1.02);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        
        .SideNav-item {
            transition: 0.5s;
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
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
        }
        
        div.title-right .btn:hover {
            width: auto;
            border-radius: 2em !important;
            background-color: rgba(60, 210, 205, 0.9) !important;
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
        
        /* 搜索框样式 */
        .subnav-search-input {
            border-radius: 2em;
            float: unset !important;
            background: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(3px);
            -webkit-backdrop-filter: blur(3px);
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
        
        // 右上角按钮描述
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
        console.log('MDGmeek : 应用MDUI卡片基础样式（带高斯模糊）');
    }
});
